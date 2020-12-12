const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const forumSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    text: { type: String, required: true },
    image_url: { type: String, required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: String, required: true },
    total_comments: { type: String, required: true }
})

forumSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Forum', forumSchema)