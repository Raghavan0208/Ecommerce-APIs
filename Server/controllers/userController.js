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

    return res.status(200).send({
        success : true,
        message :"Login Success",
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