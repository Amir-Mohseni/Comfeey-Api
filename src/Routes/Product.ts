import { Router } from 'express'
import { createProductController, findProductController, getProductsController, increaseProductView, getRecentProductsController,
    searchProductsController, addProductToFavorites } from '../Controllers/Products'
import { mustBeAuthenticated } from '../Middlewares/User'


const router = Router()

router.post( '/products', createProductController)
router.post( '/product/view', increaseProductView)
router.post( '/product/fav', mustBeAuthenticated, addProductToFavorites)
router.get( '/product/:id', findProductController)
router.get( '/product/search/:tag', searchProductsController)
router.get( '/recentproducts/', getRecentProductsController)
router.get( '/recentproducts/:id', getRecentProductsController)
router.get( '/products/', getProductsController)
router.get( '/products/:skip', getProductsController)
router.get( '/products/:category/:skip', getProductsController)
router.get( '/products/:category/:subCategory/:skip', getProductsController)

export default router