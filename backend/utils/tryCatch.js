const tryCatch=(controllers)=>async(req,res,next)=>{
    try {
       await controllers(req,res,next)
    } catch (error) {
        return next(error)
    }
}
module.exports=tryCatch