const Joi = require('joi');

const userSchema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .max(30),
        
    lastname: Joi.string()
        .min(3)
        .max(30),
    
    email: Joi.string().email()
        .min(5)
        .max(55)
        .required(),
        
    password: Joi.string()
        .min(8)
        .max(50),
        
    newsletters: Joi.boolean(),
    
    description: Joi.string()
        .max(255),
        
    pic_url: Joi.string()
})

module.exports = userSchema