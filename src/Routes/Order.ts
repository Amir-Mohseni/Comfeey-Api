import { Router } from 'express'
import { CreateOrderController } from '../Controllers/Order'
import { mustBeAuthenticated } from '../Middlewares/User'

const router = Router()

router.post( '/order', mustBeAuthenticated, CreateOrderController)

export default router