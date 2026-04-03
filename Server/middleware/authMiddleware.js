import JWt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

export const isAuth = async (req,res,next) => {
    const {token} = req.cookies;
    //validation
    if(!token){
        return res.status(401).send({
            success : false,
            message : "UnAuthorized token"
        });
    }
    const decodedata = JWt.verify(token , process.env.JWT_SECRET);
    req.user = await usermodel.findById(decodedata._id);
    next();
};