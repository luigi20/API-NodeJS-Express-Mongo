const nodemailer = require('nodemailer');
const { host, port, user, password } = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: password
    }
});

module.exports = transport