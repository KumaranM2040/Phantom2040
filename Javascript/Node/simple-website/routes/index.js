var express = require('express');
var router = express.Router();
const extractparser = require('../extract-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  let account = extractparser.statementObject.accounts[0].details;
  account["combinedAddress"] = [account.AddressLine1, account.AddressLine2, account.AddressLine3, account.AddressLine4, account.AddressLine5, account.AddressLine6, account.AddressLine7, account.AddressLine8];
  console.log(account);
  let c = parseFloat(account.LoanAgreementAmount);
  let a  = account.LoanAgreementAmount.toLocaleString('en',{useGrouping: true});
  let d = c.toLocaleString('en',{style : 'currency', currency: 'R', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2});
  res.render('index', { title: 'Express', account});
});

module.exports = router;
