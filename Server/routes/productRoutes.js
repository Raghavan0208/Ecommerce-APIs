import express from 'express';
import { createProductController, getAllProductsController, getSingleProductsController, updateProductController } from '../controllers/productController.js';
import { isAuth } from '../middleware/authMiddleware.js';
import singlefileupload from "../middleware/multer.js"

const router = express();

//routes

router.get('/get-All',getAllProductsController);

router.get('/:id',getSingleProductsController);

//create product
router.post('/createproduct',isAuth,singlefileupload,createProductController)

//Update product
router.put('/:id',isAuth,updateProductController);

export default router
