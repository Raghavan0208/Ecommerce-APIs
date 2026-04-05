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
    images : [{
        public_id : String,
        url : String
        
    },
],

},{timestamps:true})

export const productmodel = mongoose.model("Products",productSchema);
export default productmodel;