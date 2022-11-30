import { insertOne, findMany } from '../db/index'

export interface Order {
	user_id: String;
	product_ids: String[];
	total: number;
	status: String;
	address: String;
}

export const findUserOrders = async ( id: string ) => {

	const orders = await findMany( 'orders', { user_id: id } )

	return orders

}

export const createOrder = async ( newOrder: Order ) => {

	const createdOrder = await insertOne( 'orders', newOrder )

	return createdOrder

}

