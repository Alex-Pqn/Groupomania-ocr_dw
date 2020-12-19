const Joi = require('joi');

const forumSchema = Joi.object({
    user_id: Joi.number()
        .required(),
    
    text: Joi.string()
        // .min()
        // .max()
        .required(),
        
    image_url: Joi.string(),
    
    created_at: Joi.date()
        .required(),
})

module.exports = forumSchema