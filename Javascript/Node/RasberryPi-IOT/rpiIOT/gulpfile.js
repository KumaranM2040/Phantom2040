"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const Gpio = require("onoff").Gpio;
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const request = require("request-promise-native");
var nodeServer;

function updateCloudFlareDNSARecordIfRequired() {
  var prom = new Promise(function(resolve, reject) {
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const content = body.result[0].content;
        console.log(content);
      }
    }

    function onError(error) {
      console.log("failed due to error" + error);
      reject();
    }

    function onSuccess(currentPublicIP) {
      console.log("Our current Public IP is " + currentPublicIP);
      const options = {
        url:
          "https://api.cloudflare.com/client/v4/zones/9ec329dd044850e58adaf4b438a55530/dns_records?type=A&name=silverlanternslight.com&status=active&account.id=77a3d8b49911c385263fb6627104a40b&page=1&per_page=20&order=status&direction=desc&match=all",
        json: "true",
        headers: {
          "X-Auth-Email": "kumaranm2040@gmail.com",
          "X-Auth-Key": "e6a6ea969e14bcf8832ea36fd2d74730bf267"
        }
      };
      request(options).then(
        result => {
          let dnsARecord = result.result[0].content;
          const dnsId = result.result[0].id;
          console.log(dnsARecord);
          if (dnsARecord !== currentPublicIP && currentPublicIP.length > 0) {
            console.log(
              "Change in Public IP address detected: Current Public IP is " +
                currentPublicIP +
                " dnsARecord is " +
                dnsARecord
            );
            request
              .patch({
                url:
                  "https://api.cloudflare.com/client/v4/zones/9ec329dd044850e58adaf4b438a55530/dns_records/" +
                  dnsId,
                headers: {
                  "X-Auth-Email": "kumaranm2040@gmail.com",
                  "X-Auth-Key": "e6a6ea969e14bcf8832ea36fd2d74730bf267",
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  type: "A",
                  name: "silverlanternslight.com",
                  content: currentPublicIP,
                  ttl: 1,
                  proxied: false
                })
              })
              .then(
                response => {
                  console.log(
                    "Successfully update Cloudflare DNS A record for Domain silverlanternslight" +
                      response
                  );
                  resolve();
                },
                error => {
                  console.log(
                    "Patch to Cloudflare failed due to error" + error
                  );
                  reject();
                }
              );
          } else if (currentPublicIP.length > 0) {
            console.log("No change in Public IP address " + currentPublicIP);
            resolve();
          }
        },
        error => {
          console.log("DNS check on CloudFlare failed with error" + error);
          reject();
        }
      );
    }
    request("https://api.ipify.org").then(onSuccess, onError);
  });
  return prom;
}

function startWebServer() {
  var prom = new Promise(function(resolve, reject) {
    if (app.get("env") === "development") {
      const server = http.createServer(app);
      nodeServer = server;
      app.use(express.static("./"));

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
      nodeServer = server;

      app.use(express.static("./"));
      server.listen(443, () => {
        console.log("HTTPS Server running on port 443");
        resolve();
      });
    }
  });
  return prom;
}

function gpioInitialise(done) {
  if (Gpio.accessible) {
    const relayGPIO1 = new Gpio(17, "out");
    const relayGPIO2 = new Gpio(27, "out");
    const relayGPIO3 = new Gpio(10, "out");
    const relayGPIO4 = new Gpio(11, "out");
    //const iv = setInterval(_ => relayGPIO1.writeSync(relayGPIO1.readSync()^1),200);

    const io = require("socket.io")(nodeServer);

    var GPIOControllerSocket = io.of("/gpio-socket");

    function toggleRelay(relay) {
      relay.writeSync(relay.readSync() ^ 1);
      return relay.readSync();
    }
    GPIOControllerSocket.on("connection", function(socket) {
      console.log(
        "A new gpio-socket WebSocket namespace client connected with ID: " +
          socket.client.id,
        socket.client
      );
      socket.on("GPIO", function(msg, fn) {
        console.log(msg);
        if (msg.toggle === true) {
          let result = 0;
          switch (msg.relay) {
            case "btnRelay1":
              result = toggleRelay(relayGPIO1);
              break;
            case "btnRelay2":
              result = toggleRelay(relayGPIO2);
              break;
            case "btnRelay3":
              result = toggleRelay(relayGPIO3);
              break;
            case "btnRelay4":
              result = toggleRelay(relayGPIO4);
              break;
          }

          fn(msg.relay, result === 1 ? "ON" : "OFF");
          socket.emit("relayState", {
            relay: msg.relay,
            state: result === 1 ? "ON" : "OFF"
          });
          console.log(result);
        } else {
          let result = 0;
          switch (msg.relay) {
            case "btnRelay1":
              result = relayGPIO1.readSync();
              break;
            case "btnRelay2":
              result = relayGPIO2.readSync();
              break;
            case "btnRelay3":
              result = relayGPIO3.readSync();
              break;
            case "btnRelay4":
              result = relayGPIO4.readSync();
              break;
          }
          fn(msg.relay, result === 1 ? "ON" : "OFF");
        }

        console.log(msg);
      });
    });
  }
  done();
}

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

// BrowserSync
function browserSync(done) {
  browsersync.init({
    ui: false,
    server: {
      baseDir: "./"
    },
    socket: {
      namespace: `http://localhost:3000/bs`
    },
    port: 3000,
    tunnel: false
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap JS
  var bootstrapJS = gulp
    .src("./node_modules/bootstrap/dist/js/*")
    .pipe(gulp.dest("./vendor/bootstrap/js"));
  // Bootstrap SCSS
  var bootstrapSCSS = gulp
    .src("./node_modules/bootstrap/scss/**/*")
    .pipe(gulp.dest("./vendor/bootstrap/scss"));
  // ChartJS
  var chartJS = gulp
    .src("./node_modules/chart.js/dist/*.js")
    .pipe(gulp.dest("./vendor/chart.js"));
  // dataTables
  var dataTables = gulp
    .src([
      "./node_modules/datatables.net/js/*.js",
      "./node_modules/datatables.net-bs4/js/*.js",
      "./node_modules/datatables.net-bs4/css/*.css"
    ])
    .pipe(gulp.dest("./vendor/datatables"));
  // Font Awesome
  var fontAwesome = gulp
    .src("./node_modules/@fortawesome/**/*")
    .pipe(gulp.dest("./vendor"));
  // jQuery Easing
  var jqueryEasing = gulp
    .src("./node_modules/jquery.easing/*.js")
    .pipe(gulp.dest("./vendor/jquery-easing"));
  // jQuery
  var jquery = gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./vendor/jquery"));
  return merge(
    bootstrapJS,
    bootstrapSCSS,
    chartJS,
    dataTables,
    fontAwesome,
    jquery,
    jqueryEasing
  );
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: "./node_modules"
      })
    )
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(
      header(banner, {
        pkg: pkg
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      header(banner, {
        pkg: pkg
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./js"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const iotapprun = gulp.series(
  updateCloudFlareDNSARecordIfRequired,
  startWebServer,
  gpioInitialise
);
const watch = gulp.series(build, gulp.parallel(watchFiles, iotapprun));
setInterval(updateCloudFlareDNSARecordIfRequired, 1800000); // check every 30min for change in ipaddress and update CloudFlare if required

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.iotapprun = iotapprun;
