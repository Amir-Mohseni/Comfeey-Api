import { findMany, CountDocs } from '../db/index'

export interface Category {
	name: String;
	img?: String;
}

export const getAllCategories = async () => {

	const categories = await findMany( 'categories', {} )

	return categories

}

export const getCatCount = async ( category: string, isSub: boolean ) => {

	const query = isSub ? { subCategory: { $in: [category] } } : { category: { $in: [category] } }

	const count = await CountDocs( 'products', query )

	return count
}