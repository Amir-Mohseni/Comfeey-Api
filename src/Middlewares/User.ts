import { Request, Response, NextFunction } from "express"
import { tryCatchWrapper, validateToken } from '../utils/utils'
import { ReqWithUser } from '../Types/types'
import { Token } from '../Types/types'
// import { getUserInfo } from '../Models/Users'

import jwt from 'jsonwebtoken'

export const mustNotBeAuthenticated = tryCatchWrapper( async (req: Request, res: Response, next: NextFunction ) => {

  const { access_token, refresh_token } = req.headers;

  // check jwt exists
  if ( typeof access_token === 'string' && typeof refresh_token === 'string' ) {

		try {

      const decodedToken: Token | string = <any>jwt!.verify( access_token, process.env.ACCESS_TOKEN_SECRET || 'secret' );

			if( typeof decodedToken === 'string' || !decodedToken._id ) {
				throw new Error('Token not valid')
			}

			const tokenValidation = validateToken(decodedToken._id, refresh_token)

			if (tokenValidation) {
        res.status(300).json({
          success: false,
          code: 2,
          message: "You are already logged in.",
        });
        return;
      }

      next();

		} catch(err) {
			next();
		}

  } else {
		next();
  }
})

export const mustBeAuthenticated = tryCatchWrapper( async ( req: ReqWithUser, res: Response , next: NextFunction ) => {

  const { access_token, refresh_token } = req.headers;

  // check jwt exists
  if ( typeof access_token === 'string' && typeof refresh_token === 'string' ) {

      const decodedToken: Token | string = <any>jwt.verify( access_token, process.env.ACCESS_TOKEN_SECRET || 'secret' );

			if( typeof decodedToken === 'string' || !decodedToken._id ) {
        res.status(403)
				throw new Error('Token not valid')
			}

			const tokenValidation = await validateToken(decodedToken._id,refresh_token)

      if (tokenValidation) {
        req.user = decodedToken;
        next();
      } else {
        res
          .status(400)
          .json({ success: false, message: "You must be logged in." });
        return;
      }

  } else {
    res
      .status(400)
      .json({ success: false, message: "You should be authenticated." });
    return;
  }
})