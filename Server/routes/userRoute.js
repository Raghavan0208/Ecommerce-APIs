import express from 'express';
import { getUserProfile, loginController, logoutController, registerController, updateProfileController } from '../controllers/userController.js';
import { isAuth } from '../middleware/authMiddleware.js';

// router object

const router = express();

//routes

//register
router.post('/register',registerController)

//login
router.post('/login',loginController)

//profile
router.get('/profile',isAuth, getUserProfile)

//logout
router.get('/logout',isAuth, logoutController)

//Update-Profile
router.put('/update-profile',isAuth, updateProfileController)


        //export
export default router;