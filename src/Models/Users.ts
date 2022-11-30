import { ObjectID } from 'mongodb'
import { findOne, insertOne, findMany, updateOne } from '../db/index'

export interface User {
	username: String;
	password: String;
	email?: String;
	phone?: String;
  img?: String;
	name?: String;
	lastName?: String;
	companyName?: String;
	address?: String;
	zipcode?: String;
	city?: String;
	country?: String;
	wishlist?: String[];
	refreshToken?: String;
	isSubscriber?: Boolean;
}

export interface Contact {
	name: String;
	email: String;
	subject: String;
	message: String;
}

export interface UserUpdate {
	password?: String;
	email?: String;
	phone?: String;
  img?: String;
	name?: String;
	lastName?: String;
	companyName?: String;
	address?: String;
	zipcode?: String;
	city?: String;
	country?: String;
	refreshToken?: String;
	isSubscriber?: Boolean;
}

const userInfoObj = {
	email: 1,
	phone: 1,
  img: 1,
	name: 1,
	lastName: 1,
	companyName: 1,
}

const userAddressObj = {
	address: 1,
	zipcode: 1,
	city: 1,
	country: 1,
}

const userCredObj = {
	refreshToken: 1
}

export const getUserInfo = async ( id: string ) => {

	const userId = new ObjectID(id)

	const user = await findOne( 'users', { _id: userId }, { projection: userInfoObj } )

	return user

}

export const getUserAdd = async ( id: string ) => {

	const userId = new ObjectID(id)

	const user = await findOne( 'users', { _id: userId }, { projection: userAddressObj } )

	return user

}

export const getUserWishlist = async ( id: string ) => {

	const wishList = await findMany( 'favorites', { userId: id }, { projection: { productId: 1 } } )

	const productIds = wishList.map( ({ productId }) => new ObjectID(productId) )
	const products = await findMany( 'products', { _id: { $in: productIds } } )

	return products

}

export const getUserOrders = async ( id: string ) => {

	const user = await findOne( 'orders', { userId: id } )

	return user

}

export const getUserCred = async ( id: string ) => {

	const userId = new ObjectID(id)

	const user = await findOne( 'users', { _id: userId }, { projection: userCredObj } )

	return user

}

export const getUserByUsername = async ( username: string ) => {

	let user = await findOne( 'users', {  $or: [ { username }, { email: username } ] }, { projection: { password: 1, username: 1, email: 1 } } )

	return user

}

export const getUserPass = async ( id: string ) => {

	const userId = new ObjectID(id)

	let user = await findOne( 'users', { _id: userId }, { projection: { password: 1 } } )

	return user

}

export const getUserRT = async ( id: string ) => {

	const userId = new ObjectID(id)

	const user = await findOne( 'users', { _id: userId }, { projection: { refreshToken: 1 } } )

	return user

}

export const getUserImg = async ( id: string ) => {

	const userId = new ObjectID(id)

	const user = await findOne( 'users', { _id: userId }, { projection: { img: 1 } } )

	return user

}

export const createUser = async ( newUser: User ) => {

	const user = await insertOne( 'users', newUser )

	return user.insertedId ? user.ops[0] : 0

}

export const getUserFavorites = async ( userId: string ) => {

	const user = await findMany( 'favorites', { userId }, { projection: { productId: 1 } } )

	return user

}

export const updateUser = async ( rowId: string, updateFields: UserUpdate ) => {

	const userId = new ObjectID(rowId)

	const user = await updateOne( 'users', { _id: userId }, { $set: updateFields } )

	return user?.result.ok

}

export const insertResetToken = async ( token: string, email: string, userId ) => {

	const isSubscribed = await findOne( 'reset_sessions', { userId, valid: 1 } )

	if( isSubscribed ) {
		await updateOne( 'reset_sessions', { userId, valid: 1 }, { $set: { valid: 0 }})
	}

	const sessionReset = await insertOne( 'reset_sessions', { token, email, userId, valid: 1 } )

	return sessionReset

}

export const insertDiscountToken = async ( token: string, email: string ) => {

	const isSubscribed = await findOne( 'subscribers', { email } )

	if( isSubscribed ) return { code: 1 }

	await insertOne( 'subscribers', { email } )
	const discount = await insertOne( 'discounts', { token, email, sale: 20 } )

	return discount

}

export const insertContactForm = async ( data: Contact ) => {

	const contact = await insertOne( 'contacts', data )

	return contact

}