const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    forum_id: { type: Number, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: String, required: true },
})

commentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Comment', commentSchema)