"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const session = require("express-session");
var sessionConfig = {
  secret: 'longst5ringwithComplicatedStuff',
  resave: false,
  saveUninitialized: false,
  cookie: {}
};
app.use(express.urlencoded({
  extended: true
}));

const loginRoutes = require(path.join(__dirname, "/routes/login"));
const adminRoutes = require(path.join(__dirname, "/routes/admin"));

function startWebServer() {
  var prom = new Promise(function (resolve, reject) {
    function configureRoutes(app) {
      app.use(loginRoutes);
      app.use(adminRoutes);

      app.use(express.static("./public"));
    }

    if (app.get("env") === "development") {
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

      server.listen(443, () => {
        console.log("HTTPS Server running on port 443");
        resolve();
      });
    }
    configureRoutes(app);
  });
  return prom;
}
module.exports = startWebServer;