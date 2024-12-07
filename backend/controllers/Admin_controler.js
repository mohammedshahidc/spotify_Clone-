const jwt=require('jsonwebtoken')
const {userLoginValidationSchema}=require('../models/validation')
const User=require('../models/User_model')
const CustomError = require('../utils/CustomError')


const admin_Login=async(req,res,next)=>{
    const{error,value}=userLoginValidationSchema.validate(req.body)
    if(error){
        return next(new CustomError("admin not fount",400))
    }
    const{email,password}=value
    const adminEmail = process.env.EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email == adminEmail && password == adminPassword) {
        console.log('admin loged in')
        const token = jwt.sign({
            id: 'admin',
            isAdmin: true
        },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        )
        const refreshmentToken = jwt.sign({
            id: 'admin',
            isAdmin: true
        },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24*30 * 60 * 1000
        });
        res.cookie("refreshmentToken", refreshmentToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({errorCode:0,status:true,msg:'admin login successfully',data:{token:token,isAdmin:true,refreshmentToken:refreshmentToken}})
    
    }

}



const block_user=async(req,res,next)=>{
    const{id}=req.params
    const user=await User.findByIdAndUpdate(id)
    if(!user){
        return next(new CustomError("user not found",400))
    }
    if(user.block===false){
        user.block=true
        await user.save()
        res.status(200).json(user)
    }else{
        user.block=false
        await user.save()
        res.status(200).json(user)
    }
}


const admin_logout = async (req, res,next) => {
  
    res.clearCookie("token")
    res.clearCookie("refreshmentToken")
   res.status(200).json("successfully logout")

}


    module.exports={
        admin_Login,
        block_user,
        admin_logout
    }