var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs = require('fs');

var app = express();
const expressNunjucks = require('express-nunjucks');
const isDev = app.get('env') === 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));

const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

function TokeniseString(line) {
  return line.split('|');
}

function ParseGlobalExtractHeaders(globalHeaders) {
  let model = {};
  let tokens = TokeniseString(globalHeaders);
  model.columns = [];
  console.log(tokens[0]);
  tokens.forEach(token => {
    if (isNaN(token)) {
      model.columns.push(token);
    }
  });
  return model.columns;
}

function ParseTableHeaders(tokens) {
  let model = {};
  model.columns = [];
  console.log(tokens[0]);
  tokens.forEach(token => {
    if (isNaN(token)) {
      model.columns.push(token);
    }
  });
}

function ParseExtract() {
  const buffer = Buffer.allocUnsafe(5 * 1024 * 1024);
  const statementObject = {
    accounts: [],
    TableHeaders: []
  };
  const size = 0;
  var file = fs.createReadStream('C:\\Work\\EmailingLoanStatementsToClient\\SAHL_LoanStatements_20190523\\SAHL_LoanStatements_20190523.txt');
  file.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
    if (chunk.length) {
      console.log(chunk.length);
      //console.log(chunk.toString(););
      let chunkstr = chunk.toString();

      let tokens = chunkstr.split('|');
      let newlines = chunkstr.split('\n');
      newlines.forEach(line => {
        if (line.startsWith('Section')) {
          let globalHeader = ParseGlobalExtractHeaders(newlines[0]);
          console.log(globalHeader);
          statementObject.TableHeaders = globalHeader;
        }
        if (line.startsWith('N/A|')) {
          console.log(line);
        }
      });

      ParseTableHeaders(tokens);
      buffer.write(chunkstr);
      size += chunk.length;


    }
  });
  file.on('end', () => {
    console.log('There will be no more data.');
  });
}
ParseExtract();
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;