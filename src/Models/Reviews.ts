import { ObjectID } from 'mongodb'
import { findOne, insertOne, findMany } from '../db/index'

export interface Review {
	_id: string;
	text: String;
  img?: String[];
  product_id: String;
	name: String;
	rate?: number;
	user_id: String;
	replyTo?: String;
	confirmed: Boolean;
}

export const findProductReviews = async ( product_id: string, skip: number = 1 ) => {

	const id = new ObjectID(product_id).toString()

	const reviews: Review[] = await findMany( 'reviews', { product_id: id, confirmed: true }, { limit: 10, skip: (skip - 1) * 10 } )

	return reviews

}

export const createReview = async ( fields: Review ) => {

	const { product_id, user_id, replyTo } = fields

	if( !replyTo ) {

		const userReview = await findOne( 'reviews', { product_id, user_id, })

		if( userReview ) return false

	}

	const currentTime = Date.now()

	const createdReview = await insertOne( 'reviews', {...fields, confirmed: false, created_at: currentTime } )

	return createdReview.result.ok

}