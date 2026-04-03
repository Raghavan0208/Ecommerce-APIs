import usermodel from '../models/usermodel.js'
export const registerController = async (req,res)=>{
 try {

        const {name,email,password,address,city,country,phone} = req.body
        //validation
        if(!name || !email || !password || !address || !city || !country || !phone){
            return res.status(500).send({
                success : false,
                message : 'Please Fill the required Fields with proper information'
                
            });
        }
//existing user check
const existinguser = await usermodel.findOne({email});
//validation
if(existinguser){
    return res.status(500).send({
        success : false,
        message : "user already exist"
    })

 }
const user = await usermodel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone
        
        });
        console.log(`user : ${user}`);
        res.status(201).send({
            success : true,
            message : 'Registration success ,Please login',
            user
        })
        } 
  
    catch (error) {
        console.log(`Error in Register API : ${error}`);
        return res.status(500).send({
            success : false,
            message : 'Error in Register API',
            error
        })
        
    }

}

export const loginController = async (req,res)=>{
try {
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(500).send({
            success : false,
            message : "Pls Enter username & Password"
        });
    }
    const user = await usermodel.findOne({email}); // requires await because user is actually a Promise not an actual document.
    if(!user){
        return res.status(401).send({
            success : false,
            message :"User Not Found"
        });
    }
    const compareCredentials = await user.comparePassword(password);

    if(!compareCredentials){
        return res.status(404).send({
            success : false,
            message : "Invalid Credentials"
        });
    }
//Token Generation
const token = user.generateToken();
    return res.status(200).cookie("token",token,{
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // today April 03 11:52AM -- expire time Fri, 10 Apr 2026 06:22:20 GMT
        secure : process.env.NODE_ENV === "Development"?true : false,
        httponly : process.env.NODE_ENV === "Development"?true : false,
        
    }).send({
        success : true,
        message :"Login Success",
        token,
        user
    });
    
} catch (error) {
    console.log(`Error in login ${error}`)
    return res.status(401).send({
        success : false,
        message : "Error in Login"
    });
    
}
}

//Profile Controller

export const getUserProfile = async (req,res)=>{
    try {
        const user = await usermodel.findById(req.user._id); // fectching the actual user who have the last token generated
        user.password = undefined; // to hide the password in display
        return res.status(200).send({
            success : true,
            message : "User Profile Fetched",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in Profile API"
        })
        
    }
}

export const logoutController = async(req,res)=> {
    try {

        return res.status(200).cookie("token","",{
        expires : new Date(Date.now()),
        secure : process.env.NODE_ENV === "Development"?true : false,
        httponly : process.env.NODE_ENV === "Development"?true : false,}).send({
            success : true,
            message : "LoggedOut successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Logout Issue"
        })
        
    }
    
}

export const updateProfileController = async (req,res)=>{
    try {
        const user = await usermodel.findById(req.user._id);
        const {name,email,address,city,country,phone} = req.body
        //validation and update
        if(name) user.name = name;
        if(email) user.email = email;
        if(address) user.address = address;
        if(city) user.city = city;
        if(country) user.country = country;
        if(phone) user.phone = phone;

//saving the updated user
        await user.save();
        return res.status(200).send({
            success : true,
            message : "Profile Updated"
        })
    } catch (error) {

        console.log(`Error in Update Profile ${error}`);
        return res.status(500).send({
            message : "User profile Cannot be Updated"
        })
        
    }
}

export const updatepasswordController = async (req,res)=>{
    try {
        const {oldpassword,newpassword} = req.body;
       const user= await usermodel.findById(req.user._id)
        if(!oldpassword || !newpassword){
           return res.status(500).send({
            success : false,
            message : "Provide Old and New Password"
           })
        }
        //compare Old password check

        const isMatch = user.comparePassword(oldpassword)
        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : "Invalid Old Password"
            })
        }
        user.password = newpassword;
        await user.save();
        return res.status(200).send({
            success : true,
            message :"Password updated Successfully",
            
        })

    } catch (error) {
        console.log(`Error in update-password ${error}`);
        return res.status(500).send({
            success: false,
            message : "Error in Updating Password"
        })
        
    }
}