"use strict";

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const session = require("express-session");
const nunjucks = require('nunjucks');
const helmet = require("helmet");
var bodyParser = require('body-parser')

var MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: '3306',
    user: 'iotuser',
    password: 'Password1',
    database: 'iotDb',
    connectionlimit: 20,
};

const store = new MySQLStore(options)
const isDev = app.get('env') === 'development';

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: isDev,
    noCache: isDev
});

var sessionConfig = {
    secret: 'longst5ringwithComplicatedStuff',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: store,
    expires: new Date(Date.now() + (15 * 60 * 1000)) //15min session
};
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

console.log('CWD directory is' + process.cwd() + 'and __dirname is' + __dirname);
console.log('Pathjoin directory is ' + path.join(__dirname, 'views'));
console.log('__dirname' + __dirname);
console.log('__dirname/../' + __dirname + '/../');

const basePath = '/iot';
const authRoutes = require(path.join(__dirname, "/routes/auth"));
const adminRoutes = require(path.join(__dirname, "/routes/admin"));
const indexRoutes = require(path.join(__dirname, "/routes/index"));
const relayRoutes = require(path.join(__dirname, "/routes/relays"));

function startWebServer() {
    var prom = new Promise(function(resolve, reject) {
        function configureRoutes(app) {
            app.use(basePath, authRoutes);
            app.use(basePath, adminRoutes);
            app.use(basePath, indexRoutes);
            app.use(basePath, relayRoutes);
            app.use(basePath, express.static(path.join(process.cwd(), 'public')));
        }

        console.log(sessionConfig);
        sessionConfig.cookie.secure = true;
        app.use(session(sessionConfig));

        // you'll need these headers if your API is deployed on a different domain than a public page
        // in production system you could set Access-Control-Allow-Origin to your domains
        // or drop this expression - by default CORS security is turned on in browsers
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "*");
            next();
        });

        const server = http.createServer(app);

        global.nodeserver = server;

        server.listen(3000, () => {
            console.log("HTTP Server running on port 3000");
            resolve();
        });
        configureRoutes(app);
    });
    return prom;
}
module.exports = startWebServer;