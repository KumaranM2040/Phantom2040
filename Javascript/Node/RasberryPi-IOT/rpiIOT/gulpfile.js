"use strict";
// Load plugins
const gulp = require("gulp");

const isDev = process.env.NODE_ENV === "development";

const cloudflareServerUpdate = require("./server/cloudflare-dns-a-record");
const expressapp = require("./server/expressapp");
const gpioInitialise = require("./server/gpio-controller");
const dbConnector = require("./server/db-connector");

// Load package.json for banner
const pkg = require("./package.json");

let iotapprun;

// Define complex tasks
if (isDev) {
    iotapprun = gulp.series(dbConnector.InitialiseMariaDBConnection, expressapp);
} else {
    iotapprun = gulp.series(
        cloudflareServerUpdate,
        dbConnector.InitialiseMariaDBConnection,
        expressapp,
        gpioInitialise
    );
    setInterval(cloudflareServerUpdate, 1800000); // check every 30min for change in ipaddress and update CloudFlare if required
}

// Export tasks
exports.iotapprun = iotapprun;