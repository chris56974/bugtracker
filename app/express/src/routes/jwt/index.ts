import { Router } from "express";
import { loginUser, logoutUser, signupUser, forgetPassword, resetPassword } from "../../controllers/Jwt/Auth"

const router = Router()

router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/signup', signupUser)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)

export default router 
