import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { updateUser, getUserCred } from '../Models/Users'
import { Token } from '../Types/types'


export const generateToken = async ( userCred: Token, refreshed = false ) => {

	const rToken = jwt.sign( userCred, process.env.REFRESH_TOKEN_SECRET || 'secret', {
    expiresIn: refreshed ? "4d" : "2d",
  });

  const ok = await updateUser(
    userCred._id,
    { refreshToken: rToken }
  );

  const accessToken = jwt.sign(
    userCred,
    process.env.ACCESS_TOKEN_SECRET || 'secret',
    { expiresIn: refreshed ? "2d" : "60min" }
  );

  if (!ok) {
    return { success: false };
  }
  return { success: true, access_token: accessToken, refresh_token: rToken };

};

export const validateToken = async ( _id: string, refreshToken: string ) => {

  const user = await getUserCred( _id )

	console.log('in validateToken function in utils')
	console.log(user)
	console.log(refreshToken)

	if( user.refreshToken !== refreshToken ) return false

	return true

};

export const tryCatchWrapper = ( cb: Function ) => async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    await cb(req,res,next)
  } catch( err ) {
    console.log(err.message)
    console.log(err.name)

		determinStatusCode( res, err )
    
    next(err)
  }
}

const determinStatusCode = ( res: Response, err: any ) => {
	
	if( err.name === 'ValidationError' ){
		res.status(422)
	} else if( err.name === "TokenExpiredError" ) {
		console.log("token expired statement");

		res.status(300).json({
			success: false,
			message: "Access token expired.",
			code: 4
		});
		return

	} else if (err.expiredAt) {
		console.log("token expired statement");

		res.status(300).json({
			success: false,
			message: "Access token expired.",
			code: 4
		});
		return
	} else if ( err.message === 'Wrong Password' ) {
		console.log("wrong pass");

		res.status(400).json({
			success: false,
			message: "Wrong password.",
		});
		return
	}
	else {
		res.status(500)
	} 
}