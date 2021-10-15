const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

/*
Não se utiliza mais
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./controllers/authController')(app);

app.get('/', function (req, res) {
    res.send('Oi')
})

app.listen(3000);
