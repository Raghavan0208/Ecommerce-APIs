import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import { createCategoryController, deletecategoryController, getAllCategoryController } from '../controllers/categoryController.js';



const router =  express();

//category Routes

//Create Category
router.post('/create',isAuth,createCategoryController)

//get-ALL category
router.get('/get-All',getAllCategoryController)

//delete category
router.delete('/delete/:id',isAuth,deletecategoryController)



export default router