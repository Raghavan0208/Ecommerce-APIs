import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';


//Db import
import connectDB from './config/db.js';



//dot env config
dotenv.config();

//Database connection   
connectDB();

//cloudinary config
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})


//rest object
const app = express();

//middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//route
// import testRoutes from '../Server/routes/testRoutes.js';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
//app.use('/api/vi',testRoutes)

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/cat',categoryRoutes)

app.get('/',(req,res)=>{
    console.log('Root dir');
    return res.status(200).send({msg : 'running'});
})

//PORT
const PORT = process.env.PORT || 8080;

console.log(PORT);
app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});
//listen
app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`.bgMagenta.white);
})