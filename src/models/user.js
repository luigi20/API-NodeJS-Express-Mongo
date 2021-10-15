const mongoose = require('../database');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        require: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: 'string',
        unique: true,
        select: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;