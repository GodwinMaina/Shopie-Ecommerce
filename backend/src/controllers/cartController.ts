

import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { cart, cartProduct } from '../interface/cartInterface';
import { sqlConfig } from "../sqlConfig/sqlConfig";
import { createCartSchema } from '../validators/cartValidators';



export const createCart = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, name, description, price, category,quantity, image }: 
            { user_id: string; product_id: string; name: string; description: string; category:string; price: string; quantity: string; image: string } = req.body;
        console.log(req.body);
        
        const pool = await mssql.connect(sqlConfig);

            const cart_id = v4();
            
            const result = await pool.request()
                .input("cart_id", mssql.VarChar, cart_id)
                .input("user_id", mssql.VarChar, user_id)
                .input("product_id", mssql.VarChar, product_id)
                .input("name", mssql.NVarChar, name)
                .input("description", mssql.NVarChar, description)
                .input("price", mssql.VarChar, price)
                .input("category", mssql.VarChar, category)
                .input("quantity", mssql.Int, quantity)
                .input("image", mssql.NVarChar, image)
                .execute('createCart');

                if (result.rowsAffected && result.rowsAffected[0] > 0) {
                    return res.status(200).json({ success: true, message: 'New cart created successfully' });
                } else {
                    return res.status(500).json({ error: 'Failed to create new cart' });
                }
            } catch (error) {
                console.error('Error creating cart:', error);
                return res.status(500).json({ error: 'Failed to create cart' });
            }
};





export const getAllUsersCarts =  async(req: Request, res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig);
        let allcarts = (await pool.request().execute('getAllUsersCarts')).recordset

        return res.json({
            carts: allcarts
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getUserCart = async(req: Request, res:Response)=>{
    try {
        const user_id = req.params.user_id
        
        console.log('Fetching cart for userId:', user_id);
        console.log(user_id);
        
        const pool = await mssql.connect(sqlConfig)

        const message = (await pool.request().input("user_id", user_id).execute('getUserCart')).recordset

        console.log('Fetched cart:', message);

        return res.json({
            message
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateCart = async(req:Request, res: Response)=>{
    try {
        const id = req.params.id
        const {user_id, date, products}:cart = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("cart_id", mssql.VarChar, id)
        .input("user_id", mssql.VarChar, user_id)
        .input("date", mssql.DateTime, date)
        .input("products", mssql.Text, products)
        .execute('updateCart')).rowsAffected

        console.log(result);
        
        return res.status(200).json({
            message: "Cart updated successfully"
        })
    } catch (error) {
        return res.json({error})
    }
}

export const deleteCart = async(req: Request, res: Response)=>{
    try {
        const id = req.params.cart_id;

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("cart_id", mssql.VarChar, id)
        .execute('deleteCart')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "Cart not found"
            })
        }else{
            return res.json({
                message: "Cart deleted successfully"
            })
        }   
    } catch (error) {
        return res.json({error})
    }
}




//Logic 2
export const createCarty = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, name, description, price, category, quantity, image }: 
            { user_id: string; product_id: string; name: string; description: string; category: string; price: string; quantity: number; image: string } = req.body;

        const pool = await mssql.connect(sqlConfig);

        // Check if the product already exists in the cart for the user
        const existingCartItem = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("product_id", mssql.VarChar, product_id)
            .execute('getCartItem');

        if (existingCartItem.recordset.length > 0) {
            // If the product exists, update its quantity
            const existingQuantity = existingCartItem.recordset[0].quantity;

            // Calculate the new quantity
            let newQuantity = quantity;

            // Ensure the new quantity doesn't go below zero
            if (newQuantity < 0) {
                newQuantity = 0;
            }

            // Update the product quantity in the cart
            await pool.request()
                .input("user_id", mssql.VarChar, user_id)
                .input("product_id", mssql.VarChar, product_id)
                .input("quantity", mssql.Int, newQuantity)
                .execute('updateCartItem');

            return res.status(200).json({ success: true, message: 'Product quantity updated successfully in the cart' });
        } else {
            // If the product doesn't exist, add it to the cart with the provided quantity
            const id = v4();
            await pool.request()
                .input("cart_id", mssql.VarChar, id)
                .input("user_id", mssql.VarChar, user_id)
                .input("product_id", mssql.VarChar, product_id)
                .input("name", mssql.NVarChar, name)
                .input("description", mssql.NVarChar, description)
                .input("price", mssql.VarChar, price)
                .input("category", mssql.VarChar, category)
                .input("quantity", mssql.Int, quantity)
                .input("image", mssql.NVarChar, image)
                .execute('insertCartItem');

            return res.status(200).json({ success: true, message: 'Product added successfully to the cart' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ error: 'Failed to update cart' });
    }
};





export const getCarty = async(req: Request, res:Response)=>{
    try {
        const user_id = req.params.user_id
        
        console.log('Fetching cart for userId:', user_id);
        console.log(user_id);
        
        const pool = await mssql.connect(sqlConfig)

        const message = (await pool.request().input("user_id", user_id).execute('getUserCart')).recordset

        console.log('Fetched cart:', message);

        return res.json({
            message
        })
    } catch (error) {
        return res.json({error})
    }
}



export const deleteCarty = async(req: Request, res: Response)=>{
    try {
        const id = req.params.cart_id;

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("cart_id", mssql.VarChar, id)
        .execute('deleteCarty')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "Cart not found"
            })
        }else{
            return res.json({
                message: "Cart deleted successfully"
            })
        }   
    } catch (error) {
        return res.json({error})
    }
}