var express = require('express');
var router = express.Router();
const extractparser = require('../extract-parser');

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getTransactionalColumnHeaders(variFix)
{
  let columnNames = [] ;
  if (variFix=='1')
  {
    columnNames.push('Transaction');
    columnNames.push('Effective');
    columnNames.push('Variable Transaction');
    columnNames.push('Fixed Transaction');
    columnNames.push('Outstanding Balance');
  }else{
    columnNames.push('Transaction');
    columnNames.push('Effective');
    columnNames.push('Variable Transaction');
    columnNames.push('Outstanding Balance');
  }
  return(columnNames);
}

/* GET home page. */
router.get('/:accountNumber', function(req, res, next) {
  let chosenAccountIndex = req.params.accountNumber;//12257;//947;//1226;
  if (!chosenAccountIndex){
    chosenAccountIndex = 12257;
    console.log('Using a default account:', chosenAccountIndex);
  }
  let account = extractparser.statementObject.accounts[chosenAccountIndex].details;
  let tableRowdata = extractparser.statementObject.accounts[chosenAccountIndex].tableRowdata;
  account["combinedAddress"] = [account.AddressLine1, account.AddressLine2, account.AddressLine3, account.AddressLine4, account.AddressLine5, account.AddressLine6, account.AddressLine7, account.AddressLine8];
  account["transactionColumns"] = getTransactionalColumnHeaders(account.VariFix);
  let transactionData = [];
  extractparser.statementObject.accounts.forEach((element,index) => {
     if(element.tableRowdata.length > 45)
     {
       console.log('Big Row Index', index);
     }
  });
  
  tableRowdata.forEach(element => {
    let columns=[element.columns[0], element.columns[1], 'R'+element.columns[3], 'R'+numberWithSpaces(element.columns[5])] ;
    transactionData.push({columns});
  });
  console.log(account, tableRowdata);
  console.log(numberWithSpaces(account.LoanAgreementAmount));
  account.LoanAgreementAmount = numberWithSpaces(account.LoanAgreementAmount);
  account.HomeLoanInstalment = numberWithSpaces(account.HomeLoanInstalment);
  account.HOCPremium = numberWithSpaces(account.HOCPremium);
  account.TotalMonthlyInstalment = numberWithSpaces(account.TotalMonthlyInstalment);
  res.render('index', { title: 'Express', account, transactions: transactionData});
});

module.exports = router;
