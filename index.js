const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3030;

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get("/get", (req, res, next) => {
    res.json({
        "version": "1.0"
    });
});

app.post('/post', function(request, response) {
    response.send(request.body);
});

app.get('/', function (req, res) {
    const enJson = require('./locales/home/en.json');
    res.render('home', enJson);
});

app.get('/fr', function (req, res) {
    const frJson = require('./locales/home/fr.json');
    res.render('home', frJson);
});

app.use(express.static(__dirname + '/public'));
app.listen(port);
