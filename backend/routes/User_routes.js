const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const user_Controler=require('../controllers/User_Controler')
const { user_auth } = require('../middlewares/auth_middleware')

Routes
.post('/register',tryCatch(user_Controler.user_registration))
.put('/verifyotp',tryCatch(user_Controler.verify_otp))
.post('/login',tryCatch(user_Controler.user_login))
.get('/getsongs',tryCatch(user_Controler.get_allsongs))
.get('/getsongByid/:id',user_auth,tryCatch(user_Controler.getSongs_byId))
.get('/getalbums',tryCatch(user_Controler.getalbums))
.get("/artist",tryCatch(user_Controler.artist))
.post("/createplaylist",user_auth,tryCatch(user_Controler.create_playlist))
.get("/getplaylist",user_auth,tryCatch(user_Controler.get_playlist))
.get('/getallplaylist',tryCatch(user_Controler.getAll_playlist))
.delete("/deletefromplaylist",user_auth,tryCatch(user_Controler.deletesongfrom_playlist))
.delete("/deleteplaylist/:id",user_auth,tryCatch(user_Controler.delete_playlist))
.post("/addtofavourite",user_auth,tryCatch(user_Controler.addto_likedsong))
.get('/getfavourite',user_auth,tryCatch(user_Controler.get_favourite))
.delete('/deletefromfavourite',user_auth,tryCatch(user_Controler.deletesongfrom_favourite))
.delete("/userlogut",user_auth,tryCatch(user_Controler.userlog_out))


module.exports=Routes