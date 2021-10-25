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

const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./src/resources/mail'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: ".html",
};

transport.use('compile', hbs(handlebarOptions));

/*
Jeito antigo de se fazer esse código
transport.use('compile', hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve('./src/resources/mail/'),
    extName: ".html",
}));*/


module.exports = transport;