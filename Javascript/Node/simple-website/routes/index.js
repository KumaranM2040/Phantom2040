var express = require('express');
var router = express.Router();
const extractparser = require('../extract-parser');

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let account = extractparser.statementObject.accounts[0].details;
  account["combinedAddress"] = [account.AddressLine1, account.AddressLine2, account.AddressLine3, account.AddressLine4, account.AddressLine5, account.AddressLine6, account.AddressLine7, account.AddressLine8];
  console.log(account);
  console.log(numberWithSpaces(account.LoanAgreementAmount));
  account.LoanAgreementAmount = numberWithSpaces(account.LoanAgreementAmount);
  account.HomeLoanInstalment = numberWithSpaces(account.HomeLoanInstalment);
  account.HOCPremium = numberWithSpaces(account.HOCPremium);
  account.TotalMonthlyInstalment = numberWithSpaces(account.TotalMonthlyInstalment);
  res.render('index', { title: 'Express', account});
});

module.exports = router;
