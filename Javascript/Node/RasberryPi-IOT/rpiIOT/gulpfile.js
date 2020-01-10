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

// const Gpio = class { writeSync(){ true;} 
//                     readSync(){ true;} 
//                     unexport(){ true;} 
//                   }//require("onoff").Gpio;

const relayGPIO1 = new Gpio(17,'out');
//const iv = setInterval(_ => relayGPIO1.writeSync(relayGPIO1.readSync()^1),200);
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var GPIOControllerSocket = io.of('/gpio-socket');         
GPIOControllerSocket.on("connection", function(socket) {  
  console.log('A new gpio-socket WebSocket namespace client connected with ID: ' + socket.client.id);
  socket.on('GPIO', function(msg, fn){
        console.log(msg);
        switch(msg.relay){
           case 'btnRelay1': 
            relayGPIO1.writeSync(relayGPIO1.readSync()^1); 
            let result = relayGPIO1.readSync();
            //result = true;
            fn(msg.relay, result === 1 ? 'ON': 'OFF');
            //io.emit('GPIO', result);
            console.log(result);
            break;
         }
         //io.emit('GPIO', msg);
         
         console.log(msg);
       });

});

// todoSocket.on('ping', function(msg){
//   io.emit('ping', msg);
//   console.log('Kumaran Ping');
//   console.log(msg);
// });

GPIOControllerSocket.on('chat message', function(msg){
  io.emit('chat message', msg);
  console.log('Kumaran Ping3');
  console.log(msg);
});

// io.on('connection',()=>{
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//     console.log(msg);
//   });
// });
server.listen(5000);

setTimeout(_ => {
  // clearInterval(iv);
  // led.unexport();
  // console.log("Finished with GPIO");
},30000)

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

//GPIO Initialise

function gpioInitialise(done){
  //led = new Gpio(2,'out');
  done();
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    ui:false,
    server: {
      baseDir: "./"
    },
    socket: {
      namespace: `http://localhost:3000/bs` // <<<< HERE >>>>
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
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest('./vendor/bootstrap/js'));
  // Bootstrap SCSS
  var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest('./vendor/bootstrap/scss'));
  // ChartJS
  var chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
    .pipe(gulp.dest('./vendor/chart.js'));
  // dataTables
  var dataTables = gulp.src([
      './node_modules/datatables.net/js/*.js',
      './node_modules/datatables.net-bs4/js/*.js',
      './node_modules/datatables.net-bs4/css/*.css'
    ])
    .pipe(gulp.dest('./vendor/datatables'));
  // Font Awesome
  var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
    .pipe(gulp.dest('./vendor'));
  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./vendor/jquery-easing'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrapJS, bootstrapSCSS, chartJS, dataTables, fontAwesome, jquery, jqueryEasing);
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js',
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
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
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
