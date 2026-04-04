import express from 'express';
import { getUserProfile, loginController, logoutController, registerController, updatepasswordController, updateProfileController, updateprofilepicController } from '../controllers/userController.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { singlefileupload } from '../middleware/multer.js';

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

//Update-Password
router.put('/update-password',isAuth,updatepasswordController)

//Update-Profile Picture
router.put('/updateprofilepicture',isAuth,singlefileupload,updateprofilepicController)


        //export
export default router;