import express from 'express';
import { createProductController, deleteProductController, deleteProductImageController, getAllProductsController, getSingleProductsController, updateProductController, updateProductImageController } from '../controllers/productController.js';
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

//Update product image
router.put('/image/:id',isAuth,singlefileupload,updateProductImageController);

//Delete Product image
router.delete('/delete-image/:id',isAuth,deleteProductImageController);

//DELETE Product
router.delete('/delete-product/:id',isAuth,deleteProductController);

export default router
