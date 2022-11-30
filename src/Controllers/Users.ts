import { Request, Response } from "express"
import { createUser, getUserInfo, getUserAdd, getUserWishlist, getUserOrders, getUserByUsername,
	 			updateUser, getUserCred, getUserFavorites, getUserImg, getUserPass, insertDiscountToken,
				 insertContactForm, insertResetToken } from '../Models/Users'
import { findUserOrders } from '../Models/Orders'
import { createUserSchema, loginSchema, updateUserSchema, updateUserPassSchema,
				 createContactFormSchema, forgotSchema } from '../Validators/User'
import { tryCatchWrapper, generateToken } from '../utils/utils'
import { ReqWithUser } from '../Types/types'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import emailjs from 'emailjs-com';

import path from 'path'

import { v4 as uuidv4 } from 'uuid';

// Passed
// Creating User
export const createUserController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	// Validating Body
	const validated = await createUserSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const { password } = req.body

	const salt = await bcrypt.genSalt();
	req.body.password = await bcrypt.hash( password, salt)
	
	const createdUser = <any> await createUser( req.body )

	console.log(createdUser)

	if( !createdUser ) throw new Error('couldnt create the user')

	const { _id } = createdUser

	const token = await generateToken({ _id })

	if( !token.success ) throw new Error('Could not create token for user')

	res.status(200).json(token)

})

// Passed
// Logging in User
export const loginController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	// Validating Body
	const validated = await loginSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const { password, username } = req.body

	const user = await getUserByUsername( username )

	console.log( 'User' )
	console.log( user )

	if( !user || !user.password || !user.username ) {
		res.status(400)
		res.json({
			success: false,
			message: 'password or username does not match'
		})
		return
	}
	
	const checkPass = await bcrypt.compare(password, user.password);

	if( !checkPass ) throw new Error('Wrong Password')

	const { _id } = user

	const userCred = {
		_id
	}

	const token = await generateToken( userCred )

	if( !token.success ) throw new Error('Could not create token for user')

	res.status(200)
	res.json(token)

})


// Working on
// Sending user reset link if forgotter password
export const forgotPassController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	// Validating Body
	const validated = await forgotSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const { username } = req.body

	const user = await getUserByUsername( username )

	console.log( 'User' )
	console.log( user )

	if( !user || !user.password || !user.username ) {
		res.status(400)
		res.json({
			success: false,
			message: 'Username or Email does not exist in users'
		})
		return
	}

	const resetSession: string = uuidv4().substr(1,7);

	const resetSessionDb: any = await insertResetToken( resetSession, user.email, user._id )

	if( !resetSessionDb.acknowledged ) {
		res.status(400)
		res.json({
			success: false,
			message: 'Cannot send reset link to email'
		})
		return
	}

	const templateParams = {
		email: user.email,
		reset_token: resetSession
	}

	emailjs.send('service_k08fyfh', 'template_cVxkpJ5b', templateParams ,'user_ttrETVA5PV1DLq0MoMOvh')

	res
	.status(200)
	.json({
		success: true,
		message: 'Sent reset session successfuly'
	})

})

// Passed
// Logging out User
export const logoutController = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const loggedOut = await updateUser( req.user._id, { refreshToken: '' } )

	// Validating Body
	// const validated = await loginSchema.validateAsync(req.body)
	// if( !validated ) throw new Error('ValidationError')

	if( !loggedOut ) throw new Error('failed Logging out user')

	res.status(200)
	res.json({
		success: true,
		message: 'User Logged out successfuly'
	})

})

// Passed
// Getting User Info For Profile Page
export const fetchUserInfo = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const UserInfo = await getUserInfo(req.user._id)

	console.log('UserInfo')
	console.log(UserInfo)

	if( !UserInfo ) {
		res.status(400).json({
			success: false,
			message: 'Unable to fetch user Info'
		})
	}

	res.status(200).json({
		success: true,
		message: 'User Info Fetched successfuly',
		userInfo: UserInfo
	})

})

// Passed
// Getting User Address For Profile Page
export const fetchUserAddress = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const UserAddress = await getUserAdd(req.user._id)

	if( !UserAddress ) {
		res.status(400).json({
			success: false,
			message: 'Unable to fetch user Address'
		})
	}

	res.status(200).json({
		success: true,
		message: 'User Address Fetched successfuly',
		userAddress: UserAddress
	})

})

// Passed
// Getting User Orders For Profile Page
export const fetchUserWishlist = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const UserWishList = await getUserWishlist(req.user._id)

	if( !UserWishList ) {
		res.status(400).json({
			success: false,
			message: 'Unable to fetch user Wish List'
		})
	}

	res.status(200).json({
		success: true,
		message: 'User Wish List fetched successfuly',
		wishlist: UserWishList
	})

})

// Passed
// Getting User Orders For Profile Page
export const fetchUserOrders = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const UserOrders = await getUserOrders(req.user._id)

	console.log('UserOrders')
	console.log(UserOrders)

	if( !UserOrders ) {
		res.status(200).json({
			success: true,
			message: 'No orders available.'
		})
		return
	}

	res.status(200).json({
		success: true,
		message: 'User Orders Fetched successfuly',
		userOrders: UserOrders
	})

})

// Working On
// Getting User Orders For Profile Page
export const createDiscountToken = tryCatchWrapper( async ( req: Request, res: Response ) => {

	const { email } = req.params

	if( !email ) {
		res.status(300)
		.json({
			success: false,
			message: 'Email must be included'
		})
		return
	}

	const discountToken: string = uuidv4().substr(1,7);

	const disToken: any = await insertDiscountToken( discountToken, email )

	console.log('creating discount token')
	console.log(disToken)

	if( !disToken ) {
		res.status(500).json({
			success: false,
			message: 'Could not create discount token.'
		})
		return
	}

	if( disToken.code ) {
		res.status(400).json({
			success: false,
			message: 'User is already subscribed',
			code: 21
		})
		return
	}

	res.status(200).json({
		success: true,
		disToken: discountToken
	})

})

// Passed
// Getting a user with id
export const getUserController = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	const { _id } = req.user
		
	const user = await getUserInfo( _id )

	if( !user ) {
		res.status(200)
		.json({
			success: false,
			message: 'No User found'
		})
		return
	}

	const userOrders = await findUserOrders( _id )

	const userWithOrders = {
		...user,
		orders: userOrders
	}

	res.status(200)
	.json({
		success: true,
		user: userWithOrders
	})

})

// Passed
// Updating User
export const updateUserController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	// Validating Body
	const validated = await updateUserSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')
		
	const user = await updateUser( req.user._id, req.body )

	if( !user ) throw new Error('Could not update user')

	res.status(200)
	res.json({
		success: true
	})

})

// Passed
// Updating User
export const updateUserPassController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	// Validating Body
	const validated = await updateUserPassSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const { currentPass, newPass } = req.body

	const user = await getUserPass( req.user._id )

	if( !user ) {
		res.status(400)
		res.json({
			success: false,
			message: 'User not found in database'
		})
		return
	}

	const checkPass = await bcrypt.compare(currentPass, user.password);

	if( !checkPass ) {
		res.status(400)
		res.json({
			success: false,
			message: 'Current password does not match'
		})
		return
	}

	const salt = await bcrypt.genSalt();
	const newPassword = await bcrypt.hash( newPass, salt)

	const userNewPassword = await updateUser( req.user._id, { password: newPassword })

	if( !userNewPassword ) {
		res.status(500)
		res.json({
			success: false,
			message: 'Password change encountered an error.'
		})
		return
	}

	res.status(200)
	res.json({
		success: true,
		message: 'Password Changed Successfuly.'
	})

})

// Passed
// Check User
export const checkUserController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	console.log('user info confirmed')

	// Get user img
	const userImg = await getUserImg( req.user._id )

	const returnedUser: any = {
		_id: req.user._id,
	}

	if( userImg && userImg.img ) returnedUser.img = userImg.img

	// // Calculating Products new rate
	const allFavs = await getUserFavorites( req.user._id )

	res.status(200)
	res.json({
		success: true,
		userInfo: returnedUser,
		allFavs
	})

})

// Passed
// Refreshing user token
export const refreshUserTokenController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	const { refresh_token } = req.headers

	if( !refresh_token.length || typeof refresh_token !== 'string' ) {
		res.status(400).json({
			success: false,
			message: 'no refresh token'
		})
		console.log('no refresh token')
		return
	}
	
	const decodedToken = <any>jwt!.verify( refresh_token, process.env.ACCESS_TOKEN_SECRET || 'secret' );
	
	if( !decodedToken || !decodedToken._id ) {
		res.status(400).json({
			success: false,
			message: 'invalid Refresh Token'
		})
		console.log('invalid refresh token detected')
		console.log(decodedToken)
		return
	}
	
	const { _id } = decodedToken
	
	const user = await getUserCred( _id )
	
	if( !user.refreshToken || user.refreshToken !== refresh_token ) {
		res.status(400).json({
			success: false,
			message: 'invalid Refresh Token'
		})
		console.log('refresh token doesnt match with user refresh token')
		return
	}

	const newTokens = await generateToken({ _id }, true)

	res.status(200).json(newTokens)
	return

})

// Passed
// Creating contact form
export const createContactFormController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	// Validating Body
	const validated = await createContactFormSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const newContactForm = await insertContactForm(req.body)

	if( !newContactForm ) {
		res.status(500)
		.json({
			success: false,
			message: 'Contact form cannot be created'
		})
		return
	}

	res.status(200)
	.json({
		success: true,
		message: 'Contact form created successfuly'
	})
	return

})

// Passed
// Creating contact form
export const uploadUserPhotoController = tryCatchWrapper( async ( req: any,res: Response ) => {

	console.log(req.file)

	const photoUrl = req.file.filename;

	console.log('photoUrl')
	console.log(photoUrl)

	const userNewImg = {
		img: photoUrl
	}

	const updatedUser = await updateUser( req.user._id, userNewImg )

	console.log(updatedUser)

	if( !updatedUser ) {
		res.status(400)
		.json({
			success: false,
			message: 'Image upload didnt complete successfuly'
		})
		return
	}

	res.status(200)
		.json({
			success: true,
			message: 'image uploaded successfuly',
			imgUrl: photoUrl
		})

})

// Passed
// Creating contact form
export const removeUserPhotoController = tryCatchWrapper( async ( req: ReqWithUser,res: Response ) => {

	const userNewImg = {
		img: ''
	}

	const updatedUser = await updateUser( req.user._id, userNewImg )

	if( !updatedUser ) {
		res.status(400)
		.json({
			success: false,
			message: 'User image didnt remove successfuly'
		})
		return
	}

	res.status(200)
		.json({
			success: true,
			message: 'image removed successfuly',
		})

})


