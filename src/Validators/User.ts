import Joi from 'joi'

export const createUserSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string()
})

export const updateUserSchema = Joi.object({
	email: Joi.string(),
	phone: Joi.string(),
	img: Joi.string(),
	name: Joi.string(),
	lastName: Joi.string(),
	companyName: Joi.string(),
	address: Joi.string(),
	zipcode: Joi.string(),
	city: Joi.string(),
	country: Joi.string(),
})

export const updateUserPassSchema = Joi.object({
	currentPass: Joi.string().required(),
	newPass: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
})

export const forgotSchema = Joi.object({
	username: Joi.string().required()
})

export const getUserFavsSchema = Joi.object({
	userId: Joi.string().required()
})

export const createContactFormSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	subject: Joi.string().required(),
	message: Joi.string().required(),
})
