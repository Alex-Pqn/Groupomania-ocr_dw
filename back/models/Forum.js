const Joi = require('joi');

const forumSchema = Joi.object({
    user_id: Joi.number()
        .required(),
    
    text: Joi.string()
        .min(2)
        .max(320)
        .required(),
        
    image_url: Joi.string(),
})

module.exports = forumSchema