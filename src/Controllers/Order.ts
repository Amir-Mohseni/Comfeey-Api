import { Response } from "express"
import { createOrder } from '../Models/Orders'
import { createOrderSchema } from '../Validators/Order'
import { tryCatchWrapper } from '../utils/utils'
import { ReqWithUser } from '../Types/types'

// Passed
// Creting Order
export const CreateOrderController = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	// Validating Body
	const validated = await createOrderSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	const newOrder = {
		...req.body,
		status: 'waiting for confirmation'
	}

	const createdOrder = await createOrder( newOrder )

	if( !createdOrder ) {
		res.status( 500 ).json({
			success: false,
			message: 'Order coudnt be created'
		})
		return
	}

	res.status(201).json({
		success: false,
		message: 'Order created successfully.'
	})

})
