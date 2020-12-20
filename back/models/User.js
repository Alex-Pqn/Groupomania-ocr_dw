const Joi = require('joi');

module.exports = Joi.object().keys({
    firstname: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/)),
        
    lastname: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/)),
    
    email: Joi.string().email()
        .min(5)
        .max(55)
        .required()
        .pattern(new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)),
        
    password: Joi.string()
        .min(8)
        .max(50)
        .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        
    newsletters: Joi.boolean(),
    
    description: Joi.string()
        .max(255),
        
    pic_url: Joi.string()
})