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

app.get('/', (req, res) => {
    var lang = req.acceptsLanguage('fr', 'en');
    if (lang) {
        res.redirect(`/${lang}`);
    } else {
        res.redirect('/en');
    }
});

app.get('/en', (req, res) => {
    const enJson = require('./locales/home/en.json');
    res.render('home', enJson);
    /*const testProject = {projects: [
            {
                "title": "IE11 Death Countdown",
                "demoUrl": "https://death-to-ie11.netlify.com",
                "sourceMsg": "Source code",
                "sourceUrl": "https://github.com/gablaroche/death-to-ie11"
            },
            {
                "title": "Simple UI for the Bored API",
                "demoUrl": "https://bored-ui.netlify.com/",
                "sourceMsg": "Source code",
                "sourceUrl": "https://github.com/gablaroche/bored-ui"
            },
            {
                "title": "Simple Case Converter",
                "demoUrl": "https://simple-case-conversion.netlify.com",
                "sourceMsg": "Source code",
                "sourceUrl": "https://github.com/gabLaroche/simple-text-conversion"
            },
            {
                "title": "Lyrics CLI",
                "demoUrl": "https://www.npmjs.com/package/my-lyrics-cli",
                "sourceMsg": "Source code",
                "sourceUrl": "https://github.com/gablaroche/lyrics-cli"
            }
        ]}
    res.render('home', {
        pageContent: enJson,
        projects: testProject
    });*/
});

app.get('/fr', (req, res) => {
    const frJson = require('./locales/home/fr.json');
    res.render('home', frJson);
});

/** START Redirect legacy site to proper urls **/
app.get('/death-to-ie11', (req, res) => {
    res.redirect('https://death-to-ie11.netlify.com');
});

app.get('/bored', (req, res) => {
    res.redirect('https://bored-ui.netlify.com/');
});

app.get('/simple-toolkit', (req, res) => {
    res.redirect('https://simple-toolkit.netlify.com');
});

app.get('/simple-toolkit/simple-case-conversion', (req, res) => {
    res.redirect('https://simple-case-conversion.netlify.com');
});
/** END Redirect legacy site to proper urls **/

app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(__dirname + '/public'));
app.listen(port);
