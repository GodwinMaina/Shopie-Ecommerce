import mssql from 'mssql';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import { sqlConfig } from '../sqlConfig/sqlConfig';


import { createProductsValidator } from '../validators/createProductsValidator';
import { createProducts } from "../interface/createProduct";


//createProducts
export const createProduct = async(req:Request, res:Response)=>{

    try{
    const{name ,image, description, quantity, category ,price} :createProducts= req.body;
    //validation
    let { error } = createProductsValidator.validate(req.body)
    if (error) {
        return res.status(404).json({
            error: error.details[0].message
        })
    }

    else{

    const id=v4();
    const pool = await mssql.connect(sqlConfig);

    const newProduct = (await pool.request()
    .input("product_id", mssql.VarChar, id)
    .input("name", mssql.VarChar, name)
    .input("image", mssql.VarChar, image)
    .input("description", mssql.VarChar, description)
    .input("quantity", mssql.VarChar, quantity)
    .input("category", mssql.VarChar, category)
    .input("price", mssql.VarChar, price)
    .execute('createProduct')
).rowsAffected;

console.log(newProduct);

if (newProduct) {
    return res.json({
        message: "Product created successfully",
    }); 
 } else {
    return res.json({  error: "An error occurred while fetching all products." });
 }
    }

}

    //catch block
    catch (error) {
        console.error("Error creating Product:", error);
        return res.json({ error: " The product was not created." });
    }
}



//getAllProducts
export const getAllProducts = async (req: Request, res: Response) => {

    try { 
        const pool = await mssql.connect(sqlConfig);
        let allProducts = (await pool.request().execute('getAllProducts')).recordset

        return res.json({
            message:allProducts
        })
    }
    
    catch (error) {
        return res.json({error})
    }
};

//getOneProduct
export const getOneProduct = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        let product = (await pool.request().input("product_id", id).execute('getOneProduct')).recordset
        return res.json({
            message:product
        })
    } catch (error) {
        return res.json({error: "An error occurred while fetching all products."})
    }
};

//updateProduct
export const updateProduct = async (req: Request, res: Response) => {
    try {

    const id = req.params.id
    const{name ,image, description, quantity, category ,price} :createProducts= req.body;

    //validation
    let { error } = createProductsValidator.validate(req.body)
    if (error) {
        return res.status(404).json({
            error: error.details[0].message
        })
    }

    else{

        const pool = await mssql.connect(sqlConfig)

        // Check if product with passed id
        const productExist = await pool.request()
            .input("product_id", id)
            .query('SELECT COUNT(*) AS productCount FROM Products WHERE product_id = @product_id');
        
        if (productExist.recordset[0].productCount === 0) {
            return res.status(404).json({ error: "No such product." });
        }

        else{
        let updatedProduct = (await pool.request()
        .input("product_id", id)
        .input("name", mssql.VarChar, name)
        .input("image", mssql.VarChar, image)
        .input("description", mssql.VarChar, description)
        .input("quantity", mssql.VarChar, quantity)
        .input("category", mssql.VarChar, category)
        .input("price", mssql.VarChar, price)
        .execute('updateProduct')).rowsAffected

        console.log(updatedProduct);
    
        return res.json({
            message: "product updated successfully"
        });
    }
     }
       } 
       
       catch (error) {
        return res.json({error})
    }
};


//deleteProduct
export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("product_id", mssql.VarChar, id)
        .execute('deleteProduct')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.json({
                error: "product not found"
            })
        }else{
            return res.json({
                message: "product deleted successfully"
            })
        }


    } catch (error) {
        return res.json({error})
    }
};



