const {userValidationSchema}=require('../models/validation')
const User=require('../models/User_model')
const CustomError=require('../utils/CustomError')
const bcrypt=require('bcrypt')
const sendEmail=require('../utils/emailService')


const user_registration=async(req,res,next)=>{

    const {value,error}=userValidationSchema.validate(req.body)
    const { name, email, password, cpassword}=value

   if(error){
    console.log('registration error:',error);
    throw error
   }
   if(password !==cpassword){
 return next(new CustomError('invalid password',404))
   }
const hashpassword=await bcrypt.hash(password,6)


const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
console.log(otp);
const new_user=new User({name,email,password:hashpassword,cpassword:hashpassword, otp,isVerified: false})
 await new_user.save()

 const emailTemplate = `
 <h1>Welcome, ${name}!</h1>
 <p>Your OTP for email verification is:</p>
 <h2>${otp}</h2>
 <p>Please use this OTP to verify your email.</p>`;

await sendEmail(email, 'Verify Your Email with OTP', emailTemplate);

 res.status(200).json({ errorcode: 0, status: true, msg: "User registered successfully. Please check your email for the OTP.", new_user})
}



const verify_otp=async(req,res,next)=>{
   
        const {email,otp}=req.body
        if(!email || !otp){
            return next(new CustomError('Email and OTP are required', 400))
        }

        const user=User.findOne({email})
        if(!user){
            return next(new CustomError('User not found', 404))
        }

        if(user.otp !==otp){
            return next(new CustomError('Invalid OTP', 400))
        }
        user.isVerified=true
        user.otp=null


        await user.save()

        res.status(200).json({
            errorcode: 0,
            status: true,
            msg: 'Email verified successfully.',
        });
}

module.exports={
    user_registration,
    verify_otp
}