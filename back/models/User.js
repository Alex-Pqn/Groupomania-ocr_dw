const Joi = require('joi');

module.exports = Joi.object().keys({
    firstname: Joi.string()
        .min(3)
        .max(30)
        // only letters except many specials caracters (and numbers if there is at least 1 letter)
        .pattern(new RegExp(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/)),
        
    lastname: Joi.string()
        .min(3)
        .max(30)
        // only letters except many specials caracters (and numbers if there is at least 1 letter)
        .pattern(new RegExp(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/)),
    
    email: Joi.string().email()
        .min(5)
        .max(55)
        .required()
        // accept e-mail caracters (number, letters and many special caracters)
        .pattern(new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)),
        
    password: Joi.string().allow('', null)
        .min(8)
        .max(50)
        // password require 8 caracters minimum, he also accept letters, numbers and many special caracters
        .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        
    newsletters: Joi.boolean(),
    
    description: Joi.string().allow('', null)
        .max(255),
        
    pic_url: Joi.string()
})