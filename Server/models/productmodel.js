import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true,'Product name is required']
    },
    description : {
        type : String,
        required : [true,'Product description is required']
    },
    price : {
        type : Number,
        required : [true,'Product Price is required']
    },
     stock : {
        type : Number,
        required : [true,'stock is required']
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    images : {
        public_id :{
            type : string
        },
        url : {
            type : string
        }
    }

},{timestamps:true})

export const productModel = mongoose.model("Products",productSchema);
export default productModel;