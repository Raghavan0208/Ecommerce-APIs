import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true ,'Username is Required']
    },
    email : {
        type : String,
        required : [true,'Email is Required'],
        unique : [true]
    },
    password : {
        type : String,
        required : [true,'Password is Required'],
        minlength : [6,'password must be greated than 6 characters']
    },
    address : {
        type : String,
        required : [true,'Address is Required']
    },
    city : {
        type : String,
        required : [true,'city is required']
    },
    country : {
        type : String,
        required : [true,'Country is Required']
    },
    phone : {
        type : String,
        required :[true,'Phone Number is Required'],
        minlength : [10,'Check the Number']
    },
    ProfilePic : {
        type : String,
    },
},{timestamps:true});

export const usermodel = mongoose.model("User" , userSchema);
export default usermodel;