import joi from 'joi'

export const registerUserValidator= joi.object({

    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),    
})