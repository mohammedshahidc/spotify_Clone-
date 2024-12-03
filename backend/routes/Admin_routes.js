const express=require('express')
const Routes=express.Router()
const tryCatch=require('../utils/tryCatch')
const { admin_Login } = require('../controllers/Admin_controler')
const uploadSong = require('../middlewares/upload_middleware')
const { addSongs } = require('../controllers/Song_controler')
const handleUpload = require('../middlewares/upload_middleware')


Routes
.post("/login",admin_Login)

.post("/addsong",handleUpload,tryCatch(addSongs))

module.exports=Routes