var express = require('express');
var router = express.Router();
const extractparser = require('../extract-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  let account = extractparser.statementObject.accounts[0].details;
  res.render('index', { title: 'Express', account});
});

module.exports = router;
