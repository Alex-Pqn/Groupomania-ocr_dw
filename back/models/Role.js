const Joi = require('joi');

const roleSchema = Joi.object({
    user_id: Joi.number()
        .required(),
    
    is_admin: Joi.boolean()
        .required(),
        
    is_mod: Joi.boolean()
        .required(),
})

module.exports = roleSchema