const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const { admin_Login, block_user, admin_logout, get_Allusers } = require('../controllers/Admin_controler')
const uploadSong = require('../middlewares/upload_middleware')
const { addSongs, editSong, delete_song } = require('../controllers/Song_controler')
const handleUpload = require('../middlewares/upload_middleware')
const { admin_auth } = require('../middlewares/auth_middleware')
const { get_allsongs } = require('../controllers/User_Controler')


Routes
.post("/login",admin_Login)

.post("/addsong",admin_auth,handleUpload,tryCatch(addSongs))
.get('/getallsongs',admin_auth,tryCatch(get_allsongs))
.put('/editsong/:id',admin_auth,handleUpload,tryCatch(editSong))
.put('/blockuser/:id',admin_auth,tryCatch(block_user))
.delete('/deletesong/:id',admin_auth,tryCatch(delete_song))
.delete("/adminlogout",admin_auth,tryCatch(admin_logout))
.get("/getallusers",admin_auth,tryCatch(get_Allusers))
module.exports=Routes