import Joi from 'joi'

export const createProductSchema = Joi.object({
	name: Joi.string().required(),
	photos: Joi.array().required(),
	price: Joi.number().required(),
	mainImage: Joi.number().default(0),
	shipping: Joi.string(),
	return: Joi.string(),
	infoGuide: Joi.string(),
	additionalInfo: Joi.string(),
	views: Joi.number(),
	options: Joi.object(),
	intro: Joi.object(),
	description: Joi.string(),
	properties: Joi.array(),
	stock: Joi.number(),
	sku: Joi.string(),
	category: Joi.array(),
	subCategory: Joi.array(),
	secret: Joi.string().required(),
})

export const ProductViewSchema = Joi.object({
	id: Joi.string().required()
})

export const addProductToFavoritesSchema = Joi.object({
	product_id: Joi.string().required()
})