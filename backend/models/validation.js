const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .optional(),

    password: Joi.string()
        .min(8)
        .optional(),

    cpassword: Joi.string()
        .valid(Joi.ref('password'))
        .optional(),

    admin: Joi.boolean().optional(),
    block: Joi.boolean().optional(),
    profilePicture: Joi.string().allow('', null).optional(),

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
    imageFile: Joi.string().allow('', null).optional(),
    audioFile: Joi.string().allow('', null).optional(),
    type: Joi.string()
        .required(),
});






module.exports = { userValidationSchema, userLoginValidationSchema, songValidationSchema };
