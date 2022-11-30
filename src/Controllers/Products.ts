import { Request, Response } from "express"
import { createProduct, findProductWithId, getAllProducts, updateProduct, getRecentProducts, searchProducts, toggleProductFavorites, findUserFavorites } from '../Models/Products'
import { findProductReviews, Review } from '../Models/Reviews'
import { createProductSchema, ProductViewSchema, addProductToFavoritesSchema } from '../Validators/Product'
import { tryCatchWrapper } from '../utils/utils'
import { ReqWithUser } from '../Types/types'

// Passed
// Creating product
export const createProductController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	// Validating Body
	const validated = await createProductSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	if( req.body.secret !== 'lkjangknvjknakv413nk5ajiojkvhjo4h9u390jngjfpo2n84hgvjnd' ) {
		res.status(400)
		res.json({
			success: false,
			message: 'Secret Not Valid'
		})
	} else delete req.body.secret
	
	const createdProduct = await createProduct( req.body )

	if( !createdProduct ) {
		res.status(500).json({
			success: false,
			message: 'Product couldnt be created.'
		})
	}

	res.status(200)
	res.json({
		success: true,
		product: createdProduct
	})

})

// Passed
// Getting all products with limit and skip
export const getProductsController = tryCatchWrapper( async ( req: Request, res: Response ) => {

	const { category, skip, subCategory } = req.params
		
	const products = await getAllProducts( 12, Number( skip || 0 ), category, subCategory )
	console.log(products)
	console.log(products.length)

	let productsWithReviews = await addReviews(products)

	// if( user_id ) {

	// 	const favoriteOnes = await markIfFavorite( user_id, productsWithReviews.map( product => product._id ) )

	// 	console.log('favoriteOnes')
	// 	console.log(favoriteOnes)

	// 	if( favoriteOnes && favoriteOnes.length ) {

	// 		productsWithReviews = productsWithReviews.map( product => {

	// 			if( favoriteOnes.includes(product._id) ) product.favoritted = true

	// 			return product
	// 		})
	// 	}
	// }

	// console.log('productsWithReviews')
	// console.log(productsWithReviews)

	res.status(200)
	res.json({
		success: true,
		products: productsWithReviews
	})

})

// Passed
// Getting all products with limit and skip
export const searchProductsController = tryCatchWrapper( async ( req: Request,res: Response ) => {

	const { tag } = req.params
		
	const products = await searchProducts( tag )

	const productsWithReviews = await addReviews(products)

	res.status(200)
	res.json({
		success: true,
		products: productsWithReviews
	})

})

// Passed
// Getting all products with limit and skip
export const getRecentProductsController = tryCatchWrapper( async ( req: Request,res: Response ) => {

	const { id } = req.params
		
	const products = await getRecentProducts(id)

	// let productsWithReviews = await addReviews(products)

	// if( req.user && req.user._id ) {

	// 	const favoriteOnes = await markIfFavorite( req.user._id, productsWithReviews.map( product => product._id ) )

	// 	if( favoriteOnes && favoriteOnes.length ) {

	// 		productsWithReviews = productsWithReviews.map( product => {

	// 			if( favoriteOnes.includes(product._id) ) product.favoritted = true

	// 			return product
	// 		})
	// 	}
	// }

	// console.log('productsWithReviews')
	// console.log(productsWithReviews)

	res.status(200)
	res.json({
		success: true,
		products
	})

})

// Passed
// Getting a product with id
export const findProductController = tryCatchWrapper( async ( req: Request,res: Response ) => {
		
	const product = await findProductWithId( req.params.id )

	if( !product || !product._id ) {
		res.status(400).json({
			success: false,
			message: 'product not found'
		})
	}

	const productReviews = await findProductReviews( product._id )

	let rate = calculateProductRate(productReviews)

	
	const productWithReviews = {
		...product,
		reviews: productReviews || [],
		rate
	}

	// if( req.user && req.user._id ) {

	// 	const favoriteOnes = await markIfFavorite( req.user._id, product._id )

	// 	if( favoriteOnes ) {
	// 		productWithReviews.favoritted = true
	// 	}
	// }

	// console.log('productWithReviews')
	// console.log(productWithReviews)

	res.status(200)
	res.json({
		success: true,
		product: productWithReviews
	})

})

// Passed
// Increase product views
export const increaseProductView = tryCatchWrapper( async ( req: Request,res: Response ) => {

	// Validating Body
	const validated = await ProductViewSchema.validateAsync(req.body)
	if( !validated ) throw new Error('ValidationError')

	// Calculating Products new rate
	const currentProduct = await findProductWithId( req.body.id )

	let newView: Number

	if( currentProduct.views ) {
		const { views } = currentProduct
		newView = views + 1
	} else {
		newView = 1
	}


	// Updating products rate
	const updatedProduct = await updateProduct( req.body.id, { views: newView } )

	res.status(200)
	res.json({
		success: true,
		product: updatedProduct
	})

})

// Passed
// Increase product views
export const addProductToFavorites = tryCatchWrapper( async ( req: ReqWithUser, res: Response ) => {

	// Validating Body
	const validated = await addProductToFavoritesSchema.validateAsync(req.body)   
	if( !validated ) throw new Error('ValidationError')

	// Calculating Products new rate
	const createdFavorite = await toggleProductFavorites( req.user._id, req.body.product_id )

	if( !createdFavorite ) {
		res.status(500)
		res.json({
			success:false
		})
	}

	res.status(200)
	res.json({
		success: true
	})

})

const addReviews = async ( products: any[] ) => {

	const productWithReviews = []

	for( let key in products ) {

		const product = products[key]

		const productReviews = await findProductReviews( product._id )

		product.reviews = productReviews.length
		product.rate = calculateProductRate(productReviews)


		productWithReviews.push(product)
	}

	return productWithReviews
}

const markIfFavorite = async ( user_id: string, product_ids: string[] | string ) => {

	if( !Array.isArray(product_ids) ) {
		const productInArray = [product_ids]
		return await findUserFavorites(user_id, productInArray)
	} else {
		return await findUserFavorites(user_id, product_ids)
	}
}

const calculateProductRate = ( reviews: Review[] ): number => {

	let totalrate: number = 0

	reviews.forEach( product => {
		if( product.rate ) {
			totalrate += product.rate
		}
	})

	return totalrate / reviews.length
}