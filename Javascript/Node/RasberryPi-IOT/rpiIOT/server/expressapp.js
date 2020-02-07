'use strict';

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const path = require('path');

const loginRoutes = require(path.join(__dirname, '../routes/login'));

function startWebServer(serverobj) {
  var prom = new Promise(function(resolve, reject) {
    function configureRoutes(app) {
      app.use(loginRoutes);

      app.use(express.static("./public"));
    }
    configureRoutes(app);

    if (app.get("env") === "development") {
      const server = http.createServer(app);

      global.nodeserver = server;

      server.listen(3000, () => {
        console.log("HTTP Server running on port 3000");
        resolve();
      });
    } else {
      // Certificate
      const privateKey = fs.readFileSync(
        "/etc/letsencrypt/live/silverlanternslight.com/privkey.pem",
        "utf8"
      );
      const certificate = fs.readFileSync(
        "/etc/letsencrypt/live/silverlanternslight.com/fullchain.pem",
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
  });
  return prom;
}
module.exports = startWebServer;
