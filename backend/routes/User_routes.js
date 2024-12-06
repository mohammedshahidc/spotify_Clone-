const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const user_Controler=require('../controllers/User_Controler')
const { user_auth } = require('../middlewares/auth_middleware')

Routes
.post('/register',tryCatch(user_Controler.user_registration))
.put('/verifyotp',tryCatch(user_Controler.verify_otp))
.post('/login',tryCatch(user_Controler.user_login))
.get('/getsongs',user_auth,tryCatch(user_Controler.get_allsongs))
.get('/getsongByid/:id',user_auth,tryCatch(user_Controler.getSongs_byId))
.post("/createplaylist",user_auth,tryCatch(user_Controler.create_playlist))
.get("/getplaylist/:id",user_auth,tryCatch(user_Controler.get_playlist))
.delete("/deletefromplaylist/:id",user_auth,tryCatch(user_Controler.deletesongfrom_playlist))
.delete("/deleteplaylist/:id",user_auth,tryCatch(user_Controler.delete_playlist))
.post("/addtofavourite/:id",user_auth,tryCatch(user_Controler.addto_likedsong))
.get('/getfavourite/:id',user_auth,tryCatch(user_Controler.get_favourite))
.delete('/deletefromfavourite/:id',user_auth,tryCatch(user_Controler.deletesongfrom_favourite))

module.exports=Routes