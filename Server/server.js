import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

//dot env config
dotenv.config();


//rest object
const app = express();

//middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


//route
app.get('/',(req,res)=>{
    console.log('Root dir');
    return res.status(200).send({msg : 'running'});
})

//PORT
const PORT = process.env.PORT || 8080;

console.log(PORT);

//listen
app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${process.env.PORT} `.bgMagenta.white);
})