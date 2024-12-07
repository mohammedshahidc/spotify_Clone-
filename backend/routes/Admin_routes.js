const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const { admin_Login, block_user, admin_logout } = require('../controllers/Admin_controler')
const uploadSong = require('../middlewares/upload_middleware')
const { addSongs, editSong, delete_song } = require('../controllers/Song_controler')
const handleUpload = require('../middlewares/upload_middleware')
const { admin_auth } = require('../middlewares/auth_middleware')


Routes
.post("/login",admin_Login)

.post("/addsong",admin_auth,handleUpload,tryCatch(addSongs))
.put('/editsong/:id',admin_auth,handleUpload,tryCatch(editSong))
.put('/blockuser/:id',admin_auth,tryCatch(block_user))
.delete('/deletesong/:id',admin_auth,tryCatch(delete_song))
.delete("/adminlogout",admin_auth,tryCatch(admin_logout))

module.exports=Routes