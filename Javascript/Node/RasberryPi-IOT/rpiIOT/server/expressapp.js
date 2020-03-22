"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const session = require("express-session");
const nunjucks = require('nunjucks');
const helmet = require("helmet");

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
app.use(express.urlencoded({
    extended: true
}));
console.log('CWD directory is' + process.cwd() + 'and __dirname is' + __dirname);
console.log('Pathjoin directory is ' + path.join(__dirname, 'views'));
console.log('__dirname' + __dirname);
console.log('__dirname/../' + __dirname + '/../');

const authRoutes = require(path.join(__dirname, "/routes/auth"));
const schedulerRoutes = require(path.join(__dirname, "/routes/scheduler"));
const adminRoutes = require(path.join(__dirname, "/routes/admin"));
const indexRoutes = require(path.join(__dirname, "/routes/index"));

function startWebServer() {
    var prom = new Promise(function(resolve, reject) {
        function configureRoutes(app) {
            app.use(authRoutes);
            app.use(adminRoutes);
            app.use(indexRoutes);
            app.use(schedulerRoutes);
            app.use(express.static(path.join(process.cwd(), 'public')));
        }

        if (isDev) {
            console.log(sessionConfig);
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
        } else {
            app.set('trust proxy', 1) // trust first proxy
            sessionConfig.cookie.secure = true;
            app.use(session(sessionConfig));
            // Certificate
            const privateKey = fs.readFileSync(
                path.join(process.cwd(), "/etc/letsencrypt/live/silverlanternslight.com/privkey.pem"),
                "utf8"
            );
            const certificate = fs.readFileSync(
                path.join(process.cwd(), "/etc/letsencrypt/live/silverlanternslight.com/fullchain.pem"),
                "utf8"
            );

            const credentials = {
                key: privateKey,
                cert: certificate
            };
            const server = https.createServer(credentials, app);
            global.nodeserver = server;
            const portNumber = 443;
            server.listen(portNumber, () => {
                console.log("HTTPS Server running on port " + portNumber);
                resolve();
            });
        }
        configureRoutes(app);
    });
    return prom;
}
module.exports = startWebServer;