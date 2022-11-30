import { Router } from 'express'
import { 
  createUserController, loginController, getUserController, logoutController, updateUserController, refreshUserTokenController,
  createContactFormController, checkUserController, fetchUserInfo, fetchUserAddress, fetchUserOrders, fetchUserWishlist,
  updateUserPassController, createDiscountToken, uploadUserPhotoController, removeUserPhotoController, forgotPassController
} from '../Controllers/Users'

import { mustNotBeAuthenticated, mustBeAuthenticated } from '../Middlewares/User'

import { uploadForUserPhoto } from '../utils/multerFuncs';


const router = Router()

router.post('/user/register', mustNotBeAuthenticated, createUserController)
router.post('/user/login', mustNotBeAuthenticated, loginController)
router.post('/user/refreshtoken', mustNotBeAuthenticated, refreshUserTokenController)
router.post('/user/forgot-pass', mustNotBeAuthenticated, forgotPassController)
router.post('/user/logout', mustBeAuthenticated, logoutController)
router.post('/user/check', mustBeAuthenticated, checkUserController)
router.post('/user/info', mustBeAuthenticated, fetchUserInfo)
router.post('/user/address', mustBeAuthenticated, fetchUserAddress)
router.post('/user/wishlist', mustBeAuthenticated, fetchUserWishlist)
router.post('/user/orders', mustBeAuthenticated, fetchUserOrders)

router.post('/user/photo', mustBeAuthenticated, uploadForUserPhoto.single("photo"), uploadUserPhotoController)
router.delete('/user/photo', mustBeAuthenticated, removeUserPhotoController)

router.put('/user', mustBeAuthenticated, updateUserController)
router.put('/user/newpass', mustBeAuthenticated, updateUserPassController)
router.get('/user', getUserController)

router.post('/contact', createContactFormController)

router.get('/distoken/:email', createDiscountToken)

export default router
