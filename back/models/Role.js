const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const roleSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    is_admin: { type: Boolean, required: true },
    is_mod: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: String, required: true },
})

roleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Role', roleSchema)