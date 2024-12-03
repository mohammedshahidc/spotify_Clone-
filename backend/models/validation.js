const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    cpassword: Joi.string()
        .valid(Joi.ref('password'))
        .required(),

    admin: Joi.boolean().optional(),
    block: Joi.boolean().optional() ,
    
});

const userLoginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});



const songValidationSchema = Joi.object({
    title: Joi.string()
        .required(),
    artist: Joi.string()
        .required(),
    album: Joi.string()
        .required(),
    duration: Joi.number()
        .min(1)
        .required(),
    image: Joi.string()
        .uri()
        ,
    fileUrl: Joi.string()
        .uri()
        ,
    type: Joi.string()
        .required(),
});






module.exports = {userValidationSchema,userLoginValidationSchema,songValidationSchema};
