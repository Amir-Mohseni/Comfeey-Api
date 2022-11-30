import { findMany } from '../db/index'

export interface SubCategory {
	name: String;
	img?: String;
}

export const getAllSubCategories = async () => {

	const subCategories = await findMany( 'subcategories', {} )

	return subCategories

}
