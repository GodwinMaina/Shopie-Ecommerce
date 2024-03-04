

import mssql from 'mssql'
import { createProduct, getAllProducts, getOneProduct, updateProduct } from '../../productController'


//Test create product
describe("product create", ()=>{

    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('successfully created product', async()=>{
        const req ={
            body:
            {
                name:"JEANS BLUE",
                image:"https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/6.jpg?9552",
                description:"Blue Denim Jeans",
                quantity:"500",
                category:"Jeans",
                price:"4,500"
            }
            
        }


        const mockedInput = jest.fn().mockReturnThis() //makes it chainable

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createProduct(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message:"Product created successfully"})
    
    })
})



//Test GETTAllProducts
describe('get all products', () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Successfully got all products', async () => {
        const mockedResult =
         [
            {product_id: "2ca503b8-24c7-4f12-a44d-ddc3ad76528d", name: "JEANS BLACK", image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/7.jpg?9552",description: "Blacky Denim Jeans",quantity: "3,000",category: "Jeans", price: "4,500"},
            {product_id: "2ca503b8-24c7-4f12-a44d-ddc3ad76528d", name: "JEANS BLACK", image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/7.jpg?9552",description: "Blacky Denim Jeans",quantity: "3,000",category: "Jeans", price: "4,500"}

        ]

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult });
        const mockedPool = {
            request: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

        await getAllProducts({} as any, res);
        
        expect(res.json).toHaveBeenCalledWith({message:mockedResult});
    });
})





// Test for getOneProduct
describe('getOneProduct', () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Successfully got one product by product_id', async () => {
       
        const mockedResult = [
            { 
                product_id: '4756cf7d-ff5c-4b78-965d-864691cbe560',
                name: "JEANS BLACK",
                image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/7.jpg?9552",
                description: "Blacky Denim Jeans",
                quantity: "3,000",
                category: "Jeans",
                price: "4,500"
            }
        ];

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult });


        const mockedPool = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);


        const req = {
            params: {
                id: '4756cf7d-ff5c-4b78-965d-864691cbe560' 
            }
        };

       
        await getOneProduct(req as any, res);

     
        expect(res.json).toHaveBeenCalledWith({ message: mockedResult });
    });

});


//test update product

// describe('update product', () => {
//     let res: any;

//     beforeEach(() => {
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis()
//         };
//     });

//     it('Successfully updated product by its product_id', async () => {
       
    
//             const req ={

//                 params: {
//                     id: '4756cf7d-ff5c-4b78-965d-864691cbe560' 
//                 },

//                 body: {
//                     name:"JEANS BLACK",
//                     image:"https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/6.jpg?9552",
//                     description:"Blue Denim Jeans",
//                     quantity:"700",
//                     category:"Jeans",
//                     price:"12,500"
//                 }
                
//             }
    
      

// const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})



//         const mockedPool = {
//             request: jest.fn().mockReturnThis(),
//             input: jest.fn().mockReturnThis(),
//             execute: mockedExecute
//         };

//         jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);


       
//         await updateProduct(req as any, res);

     
//         expect(res.json).toHaveBeenCalledWith({ message: "product updated successfully" });
//     });

// });


