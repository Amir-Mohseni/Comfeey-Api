import { Router } from 'express'
import { createReviewController } from '../Controllers/Reviews'
import { mustBeAuthenticated } from '../Middlewares/User'

const router = Router()

router.post( '/review', mustBeAuthenticated, createReviewController)

export default router