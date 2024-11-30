const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const user_Controler=require('../controllers/User_Controler')

Routes
.post('/register',tryCatch(user_Controler.user_registration))
.post('/verifyotp',tryCatch(user_Controler.verify_otp))





module.exports=Routes