import { Request, Response } from "express"
import { createReview } from '../Models/Reviews'
import { createReviewSchema } from '../Validators/Review'
import { tryCatchWrapper } from '../utils/utils'

// Passed
// Creating Review
export const createReviewController = tryCatchWrapper( async ( req: Request,res: Response ) => {

	// Validating Body
	const validated = await createReviewSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')
	
	const createdReview = await createReview( req.body )

	if( !createdReview ) {
		res.status(400).json({
			success: false,
			message: 'User Already has a review on this product.'
		})
		return
	}

	res.status(200)
	res.json({
		success: true,
		review: createdReview
	})

})

// Passed
// Creating Reply for a review
// export const replyReviewController = tryCatchWrapper( async ( req: Request,res: Response ) => {

// 	// Validating Body
// 	const validated = await createReviewSchema.validateAsync(req.body)
// 	if( !validated ) throw new Error('ValidationError')
	
// 	const createdReview = await createReview( req.body )

// 	if( !createdReview ) {
// 		res.status(500).json({
// 			success: false,
// 			message: 'Review couldnt be created.'
// 		})
// 	}

// 	res.status(200)
// 	res.json({
// 		success: true,
// 		review: createdReview
// 	})

// })