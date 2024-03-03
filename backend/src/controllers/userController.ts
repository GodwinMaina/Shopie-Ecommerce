
import mssql from 'mssql';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import { registerUserValidator } from '../validators/registerUserValidators';
import { userRegister } from "../interface/userRegister";
import { sqlConfig } from '../sqlConfig/sqlConfig';


export const RegisterUser = async (req: Request, res: Response) => {

    try {
        const { firstName, lastName, email, password }: userRegister = req.body;
        //validation
        let { error } = registerUserValidator.validate(req.body)

        if (error) {
            return res.json({
                error: error.details[0].message
            })
        }


        else {
            const emailExists = await checkIfEmailExists(email);
            if (emailExists) {
                return res.json({
                    error: 'Email is already registered',
                });
            } 
            
            else {
                const id = v4();
                const hashPwd = await bcrypt.hash(password, 5)
                const pool = await mssql.connect(sqlConfig)

                const newUser = (await pool.request()
                    .input("user_id", mssql.VarChar, id)
                    .input("firstName", mssql.VarChar, firstName)
                    .input("lastName", mssql.VarChar, lastName)
                    .input("email", mssql.VarChar, email)
                    .input("password", mssql.VarChar, hashPwd)
                    .execute('userRegister')
                ).rowsAffected;

                console.log(newUser);

                if (newUser) {
                    return res.json({
                        message: "Account created successfully",
                    });
                } else {
                    return res.json({ error: "An error occurred while registering user." });
                }
            }
        }
    }
    //catch block
    catch (error) {
        console.error("Error creating user:", error);
        return res.json({ error: " The user account was not created." });
    }
///  end of catch block///
};

    //check if email exist functionallity
    async function checkIfEmailExists(email: string): Promise<boolean> {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool
            .request()
            .input('email', mssql.VarChar, email)
            .query('SELECT COUNT(*) AS count FROM Users WHERE email = @email');
    
        return result.recordset[0].count > 0;
    }
    


//getAllUsers
export const getAllUsers = async (req: Request, res: Response) => {

    try {
       
        const pool = await mssql.connect(sqlConfig);
        let allUsers = (await pool.request().execute('getAllUsers')).recordset

        return res.json({
            message: allUsers
        })
    } catch (error) {
        return res.json({error})
    }
};


//getOneUser
export const getOneUser = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        let user = (await pool.request().input("user_id", id).execute('getOneUser')).recordset
        return res.json({
            user
        })
    } catch (error) {
        return res.json({error})
    }
};



//updateUser
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const {firstName,lastName, email, password}:userRegister = req.body
         //validation
    let { error } = registerUserValidator.validate(req.body)
    if (error) {
        return res.json({
            error: error.details[0].message
        })
    }

    else{
       const hashPwd = await bcrypt.hash(password, 5)
        const pool = await mssql.connect(sqlConfig)

         // Check if user with the provided user_id exists first
         const userExist = await pool.request()
         .input("user_id", id)
         .query('SELECT COUNT(*) AS userCount FROM Users WHERE user_id = @user_id');
     
     if (userExist.recordset[0].userCount === 0) {
         return res.json({ error: "No such user." });
     }

     else{
        let UpdateResult = (await pool.request()
        .input("user_id", id)
        .input("firstName", mssql.VarChar, firstName)
        .input("lastName", mssql.VarChar, lastName)
        .input("email", mssql.VarChar, email)
        .input("Password", mssql.VarChar, hashPwd)
        .execute('updateUser')).rowsAffected

        console.log(UpdateResult);
        
        return res.json({
            message: "User updated successfully"
        })
       }
    }

    } catch (error) {
        return res.json({error})
    }
};

//deleteUser
export const deleteUser = async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .execute('deleteUser')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.json({
                error: "User not found"
            })
            
        }else{
            return res.json({
                message: "Account deleted successfully"
            })
        }


    } catch (error) {
        return res.json({error})
    }
};