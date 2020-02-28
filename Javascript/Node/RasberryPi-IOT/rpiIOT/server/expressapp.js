"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const session = require("express-session");
const expressNunjucks = require('express-nunjucks');
const nunjucks = require('nunjucks');

const isDev = app.get('env') === 'development';


// const njk = expressNunjucks(app, {
//   autoescape: true
// });

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
  cookie: {}
};
app.use(express.urlencoded({
  extended: true
}));
console.log('CWD directory is'+process.cwd()+'and __dirname is'+ __dirname);
console.log('Pathjoin directory is '+path.join(__dirname,'views'));
console.log('__dirname'+__dirname);
console.log('__dirname/../'+__dirname+'/../');
//app.set('views', __dirname);

const loginRoutes = require(path.join(__dirname, "/routes/login"));
const adminRoutes = require(path.join(__dirname, "/routes/admin"));
const indexRoutes = require(path.join(__dirname, "/routes/index"));

function startWebServer() {
  var prom = new Promise(function (resolve, reject) {
    function configureRoutes(app) {
      app.use(loginRoutes);
      app.use(adminRoutes);
      app.use(indexRoutes);
console.log("path.join(process.cwd(), 'public') is " + path.join(process.cwd(), 'public'));
      app.use(express.static(path.join(process.cwd(), 'public')));
    }

    if (isDev) {
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