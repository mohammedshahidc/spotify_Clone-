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

module.exports = {userValidationSchema};
