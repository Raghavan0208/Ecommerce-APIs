import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

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
        public_id : {
        type : String,
        },
        url : {
            type : String
        }
    },
},{timestamps:true});

//JWT token

userSchema.methods.generateToken = function(){
    return JWT.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:"7d"})
}

//functions
//hash function to encrypt the password

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return 
    }
this.password = await bcrypt.hash(this.password,10);  // format : "$2b$10$Eb.v5EJpgf4Nzj0ihFDaKenCubYR6MujgzrGf2XHK4nFNjis0Uu46"
});


//compare function to decrypt the function for login purpose of user
userSchema.methods.comparePassword = async function(plainpassword) {
    return await bcrypt.compare(plainpassword,this.password);
}

export const usermodel = mongoose.model("Users" , userSchema);
export default usermodel;