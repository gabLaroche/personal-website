const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3030;

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

let lang = 'en';

const hbs = exphbs.create({
    helpers: {
        each_upto: function(ary, max, options) {
            if(!ary || ary.length == 0) {
                return options.inverse(this);
            }

            const result = [ ];
            for(let i = 0; i < max && i < ary.length; ++i)
                result.push(options.fn(ary[i]));
            return result.join('');
        },
        if_cond: function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    },
    extname: '.hbs'
});
app.engine('.hbs', exphbs({...hbs}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views/'));


app.get("/get", (req, res, next) => {
    res.json({
        "version": "1.0"
    });
});

app.post('/post', function(request, response) {
    response.send(request.body);
});

app.get('/', (req, res) => {
    lang = req.cookies.lang || req.acceptsLanguages('fr', 'en') || 'en';
    res.redirect(`/${lang}/`);
});

app.get(`/en/`, (req, res) => {
    const contentJson = require('./locales/content/home/en.json');
    const projectJson = require('./locales/data/projects/en.json');
    res.cookie("lang", 'en');
    res.render('home', {
        content: contentJson,
        projects: projectJson
    });
});

app.get('/fr/', (req, res) => {
    const contentJson = require('./locales/content/home/fr.json');
    const projectJson = require('./locales/data/projects/fr.json');
    res.cookie("lang", 'fr');
    res.render('home', {
        content: contentJson,
        projects: projectJson
    });
});

app.get('/en/projects/', (req, res) => {
    const contentJson = require('./locales/content/projects/en.json');
    const projectJson = require('./locales/data/projects/en.json');
    res.render('projects', {
        content: contentJson,
        projects: projectJson
    });
});

app.get('/fr/projects/', (req, res) => {
    const contentJson = require('./locales/content/projects/fr.json');
    const projectJson = require('./locales/data/projects/fr.json');
    res.render('projects', {
        content: contentJson,
        projects: projectJson
    });
});

app.get('/en/links/', (req, res) => {
    const contentJson = require('./locales/content/links/en.json');
    res.render('links', {content: contentJson});
});

app.get('/fr/links/', (req, res) => {
    res.redirect('/en/links/');
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
app.listen(port);
