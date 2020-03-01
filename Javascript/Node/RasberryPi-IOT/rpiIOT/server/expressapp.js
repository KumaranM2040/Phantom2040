"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const session = require("express-session");
const nunjucks = require('nunjucks');
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

nunjucks.configure(path.join(__dirname,'views'), {
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
  store:store
};
app.use(express.urlencoded({
  extended: true
}));
console.log('CWD directory is'+process.cwd()+'and __dirname is'+ __dirname);
console.log('Pathjoin directory is '+path.join(__dirname,'views'));
console.log('__dirname'+__dirname);
console.log('__dirname/../'+__dirname+'/../');

const loginRoutes = require(path.join(__dirname, "/routes/login"));
const adminRoutes = require(path.join(__dirname, "/routes/admin"));
const indexRoutes = require(path.join(__dirname, "/routes/index"));

function startWebServer() {
  var prom = new Promise(function (resolve, reject) {
    function configureRoutes(app) {
      app.use(loginRoutes);
      app.use(adminRoutes);
      app.use(indexRoutes);
      app.use(express.static(path.join(process.cwd(), 'public')));
    }

    if (isDev) {
      console.log(sessionConfig);
      app.use(session(sessionConfig));
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
      const portNumber = 8443;
      server.listen(portNumber, () => {
        console.log("HTTPS Server running on port "+portNumber);
        resolve();
      });
    }
    configureRoutes(app);
  });
  return prom;
}
module.exports = startWebServer;