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

const renderJson = (category, folder, lang) => {
    return require(`./locales/${category}/${folder}/${lang}.json`);
}

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
    res.redirect(`/${lang}`);
});

app.get(['/:lang', '/:lang/*'], (req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    try {
        res.locals.footer = renderJson('content', 'partials/footer', req.params.lang);
    } catch {
        const lang = req.cookies.lang || req.acceptsLanguages('fr', 'en') || 'en';
        res.locals.footer = renderJson('content', 'partials/footer', lang);
    }

    next();
})

app.get("/:lang", (req, res) => {
    const lang = req.params.lang;
    try {
        const contentJson = renderJson( 'content','home', lang);
        const projectJson = renderJson('data','projects', lang);
        res.cookie("lang", lang);
        res.render('home', {
            content: contentJson,
            projects: projectJson
        });
    } catch {
        const url = req.url
        const lang = req.cookies.lang || req.acceptsLanguages('fr', 'en') || 'en';
        const contentJson = renderJson( 'content','404', lang);
        res.status(404).render('404', {
            url: url,
            content: contentJson
        });
    }
});

app.get('/en/projects/', (req, res) => {
    const contentJson = renderJson( 'content','projects', 'en');
    const projectJson = renderJson('data','projects', 'en');
    res.render('projects', {
        content: contentJson,
        projects: projectJson
    });
});

app.get('/fr/projets/', (req, res) => {
    const contentJson = renderJson( 'content','projects', 'fr');
    const projectJson = renderJson('data','projects', 'fr');
    res.render('projects', {
        content: contentJson,
        projects: projectJson
    });
});

app.get("*", (req, res) => {
    let url = req.url
    let contentJson = {}
    if (url.includes('/fr')) {
        contentJson = renderJson( 'content','404', 'fr');
    } else {
        contentJson = renderJson( 'content','404', 'en');
    }

    res.status(404).render('404', {
        url: url,
        content: contentJson
    });
});
app.listen(process.env.PORT || port, () => console.log(`server is running on http://localhost:${port.toString()}`));