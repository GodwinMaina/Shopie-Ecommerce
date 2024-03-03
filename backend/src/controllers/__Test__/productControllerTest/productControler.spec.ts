import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { createProduct, getAllProducts } from '../../productController'

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
            {product_id: "2ca503b8-24c7-4f12-a44d-ddc3ad76528d", name: "JEANS BLACK", image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/7.jpg?9552",description: "Blacky Denim Jeans",quantity: "3,000",category: "Jeans", price: "4,500"}
        ]

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult });
        const mockedPool = {
            request: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

        await getAllProducts({} as any, res);
        
        expect(res.json).toHaveBeenCalledWith({products:mockedResult});
    });
})




