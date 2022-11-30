import { Request, Response } from "express"
import { getAllCategories, getCatCount } from '../Models/Categories'
import { tryCatchWrapper } from '../utils/utils'

// Passed
// Creting Order
export const getAllCategoriesController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	const categories = await getAllCategories()

	const categoriesWithCount = []

	for( let cat of categories ) {

		const count = await getCatCount(cat.name, cat.parent_id ? true : false )

		categoriesWithCount.push({
			...cat,
			count
		})
	}

	if( !categories ) {
		res.status( 500 ).json({
			success: false,
			message: 'categories cant be fetched'
		})
		return
	}

	res.status(201).json({
		success: true,
		categories: categoriesWithCount
	})

})
