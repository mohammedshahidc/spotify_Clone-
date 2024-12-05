const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const user_Controler=require('../controllers/User_Controler')

Routes
.post('/register',tryCatch(user_Controler.user_registration))
.put('/verifyotp',tryCatch(user_Controler.verify_otp))
.post('/login',tryCatch(user_Controler.user_login))
.get('/getsongs',tryCatch(user_Controler.get_allsongs))
.get('/getsongByid/:id',tryCatch(user_Controler.getSongs_byId))
.post("/createplaylist",tryCatch(user_Controler.create_playlist))
.get("/getplaylist/:id",tryCatch(user_Controler.get_playlist))
.delete("/deletefromplaylist/:id",tryCatch(user_Controler.deletesongfrom_playlist))
.delete("/deleteplaylist/:id",tryCatch(user_Controler.delete_playlist))
.post("/addtofavourite/:id",tryCatch(user_Controler.addto_likedsong))
.get('/getfavourite/:id',tryCatch(user_Controler.get_favourite))
.delete('/deletefromfavourite/:id',tryCatch(user_Controler.deletesongfrom_favourite))

module.exports=Routes