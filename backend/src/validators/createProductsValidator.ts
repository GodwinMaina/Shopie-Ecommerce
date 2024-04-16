
import joi from 'joi'

export const createProductsValidator  = joi.object({
    
    name :joi.string().required(),
    image:joi.string().required(),
    description:joi.string().required(),
    quantity:joi.string().required(),
    category:joi.string().required(),
    price:joi.string().required()
})