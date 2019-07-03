var express = require('express');
var router = express.Router();
const extractparser = require('../extract-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  let account = extractparser.statementObject.accounts[0].details;
  account["combinedAddress"] = [account.AddressLine1, account.AddressLine2, account.AddressLine3, account.AddressLine4, account.AddressLine5, account.AddressLine6, account.AddressLine7, account.AddressLine8];
  console.log(account);
  res.render('index', { title: 'Express', account});
});

module.exports = router;
