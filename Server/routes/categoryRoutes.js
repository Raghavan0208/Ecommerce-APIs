import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import { createCategoryController, deletecategoryController, getAllCategoryController, updateCategoryController } from '../controllers/categoryController.js';



const router =  express();

//category Routes

//Create Category
router.post('/create',isAuth,createCategoryController)

//get-ALL category
router.get('/get-All',getAllCategoryController)

//delete category
router.delete('/delete/:id',isAuth,deletecategoryController)

//Update Category
router.put('/update/:id',isAuth,updateCategoryController);



export default router