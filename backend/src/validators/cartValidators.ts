import joi from "joi";

export const createCartSchema = joi.object({
  user_id: joi.string().required(),

  date: joi.date().required(),

  product: joi
    .array()
    .items(
      joi.object({
        product_id: joi.number().required(),
        name: joi.string().required(),
        image: joi.string().required(),
        price: joi.number().required(),
        description: joi.number().required(),
        category: joi.number().required(),
        quantity: joi.number().required(),
      })
    )
    .required(),
});
