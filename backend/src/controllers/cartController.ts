

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
        const id = req.params.id

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
            return res.status(200).json({
                message: "Cart deleted successfully"
            })
        }   
    } catch (error) {
        return res.json({error})
    }
}


// export const createCart = async (req: Request, res: Response) => {

//     try {

//         const { user_id, products }: { user_id: string, products: cartProduct[] } = req.body;

//         console.log(req.body);
        

//         const pool = await mssql.connect(sqlConfig);
//         // Check if the user has an existing cart
//         const existCart = await pool.request()
//             .input("user_id", mssql.VarChar, user_id)
//             .execute('getUserCart');

//         const existingCart = existCart.recordset;

//         // Handle if the user has an existing cart
//         // if (existingCart.length > 0) {
//         //     const cart_id: string = existingCart[0].user_id;

//         //     const updatedProducts = JSON.parse(existingCart[0].products);
//         //     updatedProducts.push(...products);


//         if (existingCart.length > 0) {
//             const cart_id: string = existingCart[0].user_id;

//             // Parse the existing products JSON string
//             const existingProductsString: string = existingCart[0].products;
//             const existingProducts: cartProduct[] = JSON.parse(existingProductsString);
        
//             // Add the new products to the existing products array
//             existingProducts.push(...products);
        

//             // Update the existing cart with the new products
//             const updateResult = await pool.request()
//                 .input("cart_id", mssql.VarChar, cart_id)
//                 .input("user_id", mssql.VarChar, user_id)
//                 .input("products", mssql.NVarChar, JSON.stringify(existingProducts))
//                 .execute('updateCart');

//             if (updateResult.rowsAffected && updateResult.rowsAffected[0] > 0) {
//                 return res.status(200).json({ success: true, message: 'Product added to existing cart successfully' });
//             } else {
//                 return res.status(500).json({ error: 'Failed to update existing cart' });
//             }
//         }
        
//         else {
//             // Generate a new cart_id
//             const id = v4();
//             // Create a new cart with the products
//             const result = await pool.request()
//                 .input("cart_id", mssql.VarChar, id)
//                 .input("user_id", mssql.VarChar, user_id)
//                 .input("products", mssql.NVarChar, JSON.stringify(products))
//                 .execute('createCart');

//             if (result.rowsAffected && result.rowsAffected[0] > 0) {
//                 return res.status(201).json({ success: true, message: 'New cart created successfully' });
//             } else {
//                 return res.status(500).json({ error: 'Failed to create new cart' });
//             }
//         }
//     }
    
//     catch (error) {
//         console.error('Error creating cart:', error);
//         return res.status(500).json({ error: 'Failed to create or update cart' });
//     }
    
// };



export const createCarty = async (req: Request, res: Response) => {
    try {
        const { user_id, products }: cart = req.body;     

        let validationResult = createCartSchema.validate(req.body);
        let error: any = validationResult.error;

        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);

        const existingCart: { id: string, products: string }[] = await (await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .execute('CARTADD')).recordset;
            
        if (existingCart.length > 0) {
            const id: string = existingCart[0].id;

            const updatedProducts = JSON.parse(existingCart[0].products);
            updatedProducts.push(...products);

            let updateResult = await (await pool.request()
                .input("cart_id", mssql.VarChar, id)
                .input("user_id", mssql.VarChar,user_id)
                .input("products", mssql.NVarChar, JSON.stringify(updatedProducts))
                .execute('updateCart'));

            if (updateResult.rowsAffected && updateResult.rowsAffected[0] > 0) {
                return res.status(200).json({ success: true, message: 'Product added to existing cart successfully' });
            } else {
                return res.status(500).json({ error: 'Failed to update existing cart' });
            }
        } else {
            const id = v4();
            let result = await (await pool.request()
                .input("cart_id", mssql.VarChar, id)
                .input("user_id", mssql.VarChar, user_id)
                .input("products", mssql.NVarChar, JSON.stringify(products))
                .execute('createCart'));

            if (result.rowsAffected && result.rowsAffected[0] > 0) {
                return res.status(201).json({ success: true, message: 'New cart created successfully' });
            } else {
                return res.status(500).json({ error: 'Failed to create new cart' });
            }
        }
    } catch (error) {
        return res.status(500).json({error});
    }
};

