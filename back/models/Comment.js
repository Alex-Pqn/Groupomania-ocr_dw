const Joi = require('joi');

const commentSchema = Joi.object({
    user_id: Joi.number()
        .required(),
        
    forum_id: Joi.number()
        .required(),
    
    text: Joi.string()
        .min(2)
        .max(320)
        .required(),
})

module.exports = commentSchema