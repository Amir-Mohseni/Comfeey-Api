import Joi from 'joi'

export const createOrderSchema = Joi.object({
	user_id: Joi.string().required(),
	product_ids: Joi.array().required(),
	total: Joi.number().required(),
	address: Joi.string().required(),
})
