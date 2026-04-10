import categoryModel from '../models/categoryModel.js'
import productmodel from '../models/productmodel.js'

export const createCategoryController = async (req,res)=>{
    try {
        const {category} = req.body
        console.log(category)
        if(!category){
            return res.status(500).send({
                success : false,
                message : "Provide Category Name",
                category
            })
        }
        await categoryModel.create({category});
        res.status(201).send({
            success : true,
            message : `${category} is added as category`
        })
        
    } catch (error) {
        console.log(`Error in create category API ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid type",
            })
        }
        return res.status(500).send({
            success : false,
            message : "Cannot create Category"
        })

        
    }
}

export const getAllCategoryController = async (req,res)=>{

    try {
        const category = await categoryModel.find()
        if(!category){
            return res.status(404),send({
                success : false,
                message : "No Category Available"
            }
        
            )
        }
        res.status(200).send({
            success : true,
            message : "Category are listed below :",
            category
        })
        
    } catch (error) {
        console.log(`Error in create category API ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid type",
            })
        }
        return res.status(500).send({
            success : false,
            message : "Cannot get Category"
    })
        
}}

export const deletecategoryController = async (req,res)=>{
    try {
        const category = await categoryModel.findById(req.params.id)
        if(!category){
            return res.status(404).send({
                success : false,
                message : "No category found"
            })
            
        }
        //find the product having this category
        const products = await productmodel.find({category:category.id})

        //update the product category as undefined

        for(let i =0 ; i<products.length ; i++){
            const product = products[i];
            products[i].category = undefined;
            await product.save();
        }
// delete category and save

        await category.deleteOne();
        res.status(200).send({
            success : true,
            message  : `Category ${category.category} had been Deleted`
        })
        
    } catch (error) {
        console.log(`Error in create category API ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid type",
            })
        }
        return res.status(500).send({
            success : false,
            message : "Cannot delete Category"
    })
}}

export const updateCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findById(req.params.id)
        if(!category){
            return res.status(404).send({
                success : false,
                message : "No category Found , Provide Correct ID"
            })
        }
        const {Updcategory} = req.body
        const products = await productmodel.find({category:category._id})
        //update category in the product
        for(let i=0 ;i<products.length; i++){
            const product = products[i];
            product.category = Updcategory;
            await product.save()
        }
        if(Updcategory) category.category = Updcategory;
        await category.save()
        res.status(200).send({
            success : true,
            message : "Category Updated"
        })
        
    } catch (error) {
        console.log(`Error in Update category API ${error}`);
        //CastError || Object_ID
        if(error.name === "CastError"){
            return res.status(500).send({
                success : false,
                message : "Invalid ID",
            })
        }
        return res.status(500).send({
            success : false,
            message : "Cannot Update Category"
    })
    }
}