import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    ShippingInfo : {
        address : {
            type : String,
            require : [true,'shipping address is required']
        },
        city : {
            type : String,
            require : [true,'City is required']
        },
         country : {
            type : String,
            require : [true,'Country is required']
        }

    },
    orderItems : {
        name : {
            type : String,
            require : [true,'Product Name is Required']
        },
         price : {
            type : Number,
            require : [true,'Product Price is Required']
        },
         quantity : {
            type : Number,
            require : [true,'Product Name is Required']
        },
        
    }
},{timestamps:true})

export const orderyModel = mongoose.model("Order",orderSchema );
export default orderSchema ;