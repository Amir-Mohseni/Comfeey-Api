import Joi from 'joi'

export const createReviewSchema = Joi.object({
	text: Joi.string().required(),
	name: Joi.string().required(),
	rate: Joi.number().min(1).max(5).required(),
	product_id: Joi.string().required(),
	user_id: Joi.string().required(),
	replyTo: Joi.string(),
	img: Joi.string()
})
