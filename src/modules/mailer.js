const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { host, port, user, password } = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: password
    }
});

transport.use('compile', hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve('./src/resources/mail/'),
    extName: "html"
}));

module.exports = transport