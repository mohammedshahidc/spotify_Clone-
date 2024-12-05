const mongoose = require('mongoose')
const { type } = require('./validation')
const { boolean, required } = require('joi')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
        default:false
    },
    block: {
        type: Boolean,
        required: false,
        default:false
    },
    otp: { 
        type: String, default: null 
    }, 
    isVerified: { 
        type: Boolean, default: false 
    },
   
})

const User = mongoose.model("User", userSchema)
module.exports = User