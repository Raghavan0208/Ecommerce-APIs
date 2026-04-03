import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Db import
import connectDB from './config/db.js';



//dot env config
dotenv.config();

//Database connection   
connectDB();


//rest object
const app = express();

//middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//route
import testRoutes from '../Server/routes/testRoutes.js';
import userRoutes from './routes/userRoute.js';
app.use('/api/vi',testRoutes)

app.use('/api/vi/user',userRoutes);

app.get('/',(req,res)=>{
    console.log('Root dir');
    return res.status(200).send({msg : 'running'});
})

//PORT
const PORT = process.env.PORT || 8080;

console.log(PORT);

//listen
app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`.bgMagenta.white);
})