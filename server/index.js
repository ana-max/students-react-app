const { parse } = require('url');
const path = require('path');
const database = require('./database');
const config = require('../config/default');
const express = require('express');
const nextjs = require('next');
const routes = require('./routes');
const multer  = require("multer");
const { storageConfig, fileFilter } = require('./uploads')
require('isomorphic-fetch');

const nextApp = nextjs({dev: process.env.NODE_ENV !== 'production'});

const publicDir = path.join(__dirname, 'public');

const app = express();

app.use(express.static(publicDir));
app.use(multer({storage: storageConfig, fileFilter: fileFilter}).single('avatar'));
app.use(express.json());

const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
    nextApp.getRequestHandler()(req, res, parse(req.url, true));

routes(app);

database().then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

    nextApp.prepare().then(() => {
        const port = config.PORT;

        app.all('*', (req, res) => {
            const handleRequest = nextApp.getRequestHandler();
            const parsedUrl = parse(req.url, true);

            return handleRequest(req, res, parsedUrl);
        });

        app.listen(port, () => {
            console.info(`Server started on ${port}`);
            console.info(`Open http://localhost:${port}/`);
        });
    });
}).catch(() => {
    console.error('Unable to connect to database');
    process.exit(1);
});


