"use strict";
// Load plugins
const gulp = require("gulp");

//const path = require("path");

const cloudflareServerUpdate = require("./server/cloudflare-dns-a-record");
const expressapp = require("./server/expressapp");
const gpioInitialise = require("./server/gpio-controller");

// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
  "/*!\n",
  " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2013-" + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n",
  " */\n",
  "\n"
].join("");


// Define complex tasks
const iotapprun = gulp.series(
  cloudflareServerUpdate,
  expressapp,
  gpioInitialise
);

setInterval(cloudflareServerUpdate, 1800000); // check every 30min for change in ipaddress and update CloudFlare if required

// Export tasks
exports.iotapprun = iotapprun;
