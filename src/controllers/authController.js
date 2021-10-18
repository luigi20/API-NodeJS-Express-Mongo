const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ Error: "User Already Exists!!!" });
        }
        const user = await User.create(req.body);
        user.email = undefined;
        return res.send({ user });
    } catch (err) {
        res.status(400).send({ Error: 'Registration failed' })
    }
});


module.exports = app => app.use('/auth', router);