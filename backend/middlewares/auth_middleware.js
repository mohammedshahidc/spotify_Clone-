const jwt=require('jsonwebtoken')
const CustomError=require('./Error_handler')





const user_auth=(req,res,next)=>{

    try {
       const authHeader=req.headers['authorization'] 
       const token = authHeader && authHeader.split(' ')[1]
       console.log("token:",token);

       if(!token){
        const refreshmentToken=req.cookies?.refreshmentToken
        if(!refreshmentToken){
            return next(new CustomError("refreshment token and accessstoken is not provided"))
        }
        jwt.verify(refreshmentToken,process.env.JWT_KEY,(error,decoded)=>{
            if(error){
                return next(new CustomError('Refresh token invalid or expired',403))
            }
            const newToken=jwt.sign({id:decoded.id,username:decoded.username,email:decoded.email},
                process.env.JWT_KEY,{expiresIn:"1m"}
            )
            res.cookie('token', newToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1 * 60 * 1000,
                sameSite: 'none',
            })
            req.user=decoded
            next()
        })
       }else{
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                return next(new CustomError("Error in user_auth middleware:",err.message))
            }
            req.user=decoded
            next()
        })
       }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }


}


const admin_auth=(req,res,next)=>{

    user_auth(req,res,()=>{
        if(req.user && req.user.admin){
            next()
        }else{
            return next(new CustomError("You are not authorized as an admin",400))
        }
    })
}


module.exports={
    user_auth,
    admin_auth
}