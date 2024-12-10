require ('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./routes/User_routes')
const ErrorManager=require('./middlewares/Error_handler')
const CustomError=require('./utils/CustomError')
const adminRouter=require('./routes/Admin_routes')
const app=express()
const cookieParser = require('cookie-parser');
const cors=require('cors')

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
  }));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.use(ErrorManager)




mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('connected successfully');
})
.catch((error)=>{
    console.log("failed to connect",Error);
})


app.all("*",(req,res,next)=>{
    const err = new CustomError(`Cannot ${req.method} ${req.originalUrl}`, 404);
     next(err);
     console.log("err:",err);
})

app.listen(process.env.PORT,()=>{console.log(`server run on ${process.env.PORT}`)})