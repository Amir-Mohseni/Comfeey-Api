import { Router } from 'express'
import { getAllCategoriesController } from '../Controllers/Category'

const router = Router()

router.get( '/categories', getAllCategoriesController)

export default router