
import productmodel from "../models/productmodel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";


export const getAllProductsController = async (req,res)=>{

    try {

        const products = await productmodel.find({});
        return res.status(200).send({
            success : true,
            message :"Fetched all Products",
            products
        })
        
    } catch (error) {

        console.log(`Error in GetAllProducts API ${error}`);
       return res.status(500).send({
            success : false,
            message : "Error in fetching products",
            error
        })
        
    }

}
// GET single product
export const getSingleProductsController = async (req,res)=>{

    try 
    {

        const products = await productmodel.findById(req.params.id);
        // const id = req.params.id;
        // console.log(id)
        if(!products){
            return res.status(200).send({
                "message" : "No Product in this ID",
                "error" : Error
                
            });
        }
        return res.status(200).send({
            success : true,
            message :"Fetched Product",
            products,
            id
        })
        
    } catch (error) {

        console.log(`Error in GetSingleProducts API ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
       return res.status(500).send({
            success : false,
            message : "Error in fetching products",
            error
        })
        
    }

}
//CREATE Product

export const createProductController = async (req,res)=>{
    try {
        const {name,description,price,stock,category} = req.body

        if(!name || !description || !price || !stock ){
            return res.status(500).send({
                success : false,
                message : "Enter valid inputs"
            })
        }
        if(!req.file){
            return res.status(500).send({
                message : "please provide product image"
            })
        }
        const file =  getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const getimage ={
            public_id : cdb.public_id,
            url : cdb.secure_url
        }
      const product = await productmodel.create({
            name,description,price,stock,images :[getimage]
        })
        return res.status(201).send({
            success : true,
            message : "Product Created",
            product
        })
    } catch (error) {
        console.log(`Error in Create Product API ${error}`);
        return res.status(500).send({
            success : false,
            message : "Product is not created"
        })
        
    }
}

export const updateProductController = async (req,res)=>{
    try {

        const product = await productmodel.findById(req.params.id)

        if(!product){
            return res.status(500).send({
                message : "Product Not found"
            })
        }
        const {name,description,price,stock,category} = req.body;

        //validation & update

        if(name) product.name = name;
        if(description) product.description = description;
        if(price) product.price = price;
        if(stock) product.stock = stock;
        if(category) product.category = category;

        product.save();

        return res.status(200).send({
            success : true,
            message : "Product Updated",
            product
        })
        
    } catch (error) {

        console.log(`Product is not updated ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
        res.status(500).send({
            success : false,
            message : "Update Product API error"
        })
        
    }
}

export const updateProductImageController = async (req,res)=>{
    try {

        const product = await productmodel.findById(req.params.id);
        if(!product){
            return res.status(500).send({
                success : false,
                message : "Product not fount"
            })
        }

        if(!req.file){
              return res.status(404).send({
                    success : false,
                    message : "Product image not found"
                })
        }

        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id : cdb.public_id,
            url : cdb.secure_url
        }
        product.images.push(image);
        await product.save();
       return  res.status(200).send({
            success : true,
            message : "Product Image Updated"

        })
        

    } catch (error) {
        console.log(`Error in Update Product Image API ${error}`);
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
       return  res.status(500).send({
            success : false,
            message : "Error in Update Product Image API"
        });
        
    }

}

export const deleteProductImageController = async (req,res)=>{
    try {
        const product = await productmodel.findById(req.params.id); // id of the product
        if(!product){
            console.log(`Product Not Found`)
           return res.status(404).send({
                success : false,
                message : "Product Not found"
            })
        }
        const id = req.query.id; // id of the image should be passed
        if(!id){
            return res.status(404).send({
                success : false,
                message : "ID not found"
            })
        }
        //Find Image ID of the product.    comparing the ImageID by looping product.image array

        let IsExist = -1;   
        product.images.forEach((item , index)=>{
            if(item._id.toString()=== id.toString()){
                IsExist = index;
            }
        })
        if(IsExist<0){
            return res.status(404).send({
                success : false,
                message : "Image Not Found"
            })
        }

        //DELETE Image

        await cloudinary.v2.uploader.destroy(product.images[IsExist].public_id);
        product.images.splice(IsExist,1)
        await product.save()

        return res.status(200).send({
            success : true,
            message : "Image Deleted"
        })

        
    } catch (error) {

        console.log(`Cannot Delete Product Image (API) ${error}`);
         if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
        res.status(500).send({
            success : false,
            message : "Cannot delete Product Image"
        })
        
    }
}

export const deleteProductController = async(req,res)=>{
    try {

        const product = await productmodel.findById(req.params.id);
        if(!product){
            return res.status(404).send({
                success : false,
                message : "Product not found"
            })
        }
        // delete the associated image of the product

        for(let i=0; i<product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);

        }
        await product.deleteOne()
        res.status(200).send({
            success : true,
            message : "Product Deleted"
        })
        
    } catch (error) {
        console.log(`Cannot Delete Product Image (API) ${error}`);
         if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
        res.status(500).send({
            success : false,
            message : "Cannot delete Product Image"
        })
    }
}