"use strict";
// Load plugins
const gulp = require("gulp");

const isDev = process.env.NODE_ENV === "development";

const expressapp = require("./server/expressapp");
const gpioInitialise = require("./server/gpio-controller");
const dbConnector = require("./server/db-connector");
const scheduler = require("./server/util/scheduler");

// Load package.json for banner
const pkg = require("./package.json");

let iotapprun;

// Define complex tasks
if (isDev) {
    iotapprun = gulp.series(dbConnector.InitialiseMariaDBConnection, expressapp, gpioInitialise, scheduler.InitialiseSchedule);
} else {
    iotapprun = gulp.series(
        dbConnector.InitialiseMariaDBConnection,
        expressapp,
        gpioInitialise,
        scheduler.InitialiseSchedule
    );
}

// Export tasks
exports.iotapprun = iotapprun;