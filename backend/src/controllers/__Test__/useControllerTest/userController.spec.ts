import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { RegisterUser } from '../../userController'

describe("User Registration", ()=>{

    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('successfully registers a user', async()=>{
        const req ={
            body:{
                firstName: "Godwin",
                lastName: "Maina",
                email: "dogegodwin@gmail.com",
                password: "atopwudan"
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

        await RegisterUser(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message:"Account created successfully"})
    
    })
})





