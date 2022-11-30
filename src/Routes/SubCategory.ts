import { Router } from 'express'
import { getAllSubCategoriesController } from '../Controllers/SubCategory'

const router = Router()

router.get( '/subcategories', getAllSubCategoriesController)

export default router