const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
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
    passwordResetToken: {
        type: 'string',
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const user = mongoose.model('User', userSchema);
module.exports = user;