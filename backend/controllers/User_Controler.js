const { userValidationSchema,userLoginValidationSchema } = require('../models/validation')
const User = require('../models/User_model')
const CustomError = require('../utils/CustomError')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/emailService')
const jwt = require('jsonwebtoken')



//user registration
const user_registration = async (req, res, next) => {

    const { value, error } = userValidationSchema.validate(req.body)
    const { name, email, password, cpassword } = value

    if (error) {
        console.log('registration error:', error);
        throw next(new CustomError('registration error', error))
    }
    if (password !== cpassword) {
        return next(new CustomError('invalid password', 404))
    }
    const hashpassword = await bcrypt.hash(password, 6)


    const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
    console.log(otp);
    const new_user = new User({ name, email, password: hashpassword, cpassword: hashpassword, otp, isVerified: false })
    await new_user.save()

    const emailTemplate = `
 <h1>Welcome, ${name}!</h1>
 <p>Your OTP for email verification is:</p>
 <h2>${otp}</h2>
 <p>Please use this OTP to verify your email.</p>`;

    await sendEmail(email, 'Verify Your Email with OTP', emailTemplate);

    res.status(200).json({ errorcode: 0, status: true, msg: "User registered successfully. Please check your email for the OTP.", new_user })
}


//email verification
const verify_otp = async (req, res, next) => {

    const { otp } = req.body
    if (!otp) {
        return next(new CustomError(' OTP is required', 400))
    }
    console.log('otp:', otp);
    const user = await User.findOne({ otp })
    console.log('user:', user);
    if (!user) {
        return next(new CustomError('User not found', 404))
    }

    user.isVerified = true
    user.otp = null


    await user.save()

    res.status(200).json({
        errorcode: 0,
        status: true,
        msg: 'Email verified successfully.',
    });
}



//user login

const user_login = async (req, res, next) => {
    const { value, error } = userLoginValidationSchema.validate(req.body)
    if(error){
        return next(new CustomError(error))
    }
    const { email, password } =value
    console.log('email', email);
    

    const user=await User.findOne({email})
    if(!user){
        return next(new CustomError("user not found",400))
    }
        
    const matching=await bcrypt.compare(password,user.password)
    if(!matching){
        return next(new CustomError("password is not matching"))
    }
    if(matching && user.isVerified==true){

        const token=jwt.sign({
            id:user._id,
            username:user.name,
            email:user.email
        },
    process.env.JWT_KEY,
    {expiresIn:"1d"}
    )
    const refreshmentToken=jwt.sign({
        id:user._id,
            username:user.name,
            email:user.email
    },
    process.env.JWT_KEY,
    {expiresIn:"7d"}
)

res.status(200).json({errorCode:0,status:true,msg:'user login successfully',data:{token:token,username:user.name,refreshmentToken:refreshmentToken}})
    }

}
    


module.exports = {
    user_registration,
    verify_otp,
    user_login
}