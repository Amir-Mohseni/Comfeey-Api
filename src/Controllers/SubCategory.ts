import { Request, Response } from "express"
import { getAllSubCategories } from '../Models/SubCategories'
import { tryCatchWrapper } from '../utils/utils'

// Passed
// Creting Order
export const getAllSubCategoriesController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	const subCategories = await getAllSubCategories()

	if( !subCategories ) {
		res.status( 500 ).json({
			success: false,
			message: 'subcategories cant be fetched'
		})
		return
	}

	res.status(201).json({
		success: false,
		subCategories
	})

})
