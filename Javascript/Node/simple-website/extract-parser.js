const fs = require('fs');
var es = require('event-stream');

var chunkSize = 65536;
const bigfile = 'C:\\Work\\EmailingLoanStatementsToClient\\SAHL_LoanStatements_20190523\\SAHL_LoanStatements_20190523.txt';

const statementObject = {
    accounts: [],
    GlobalColumnHeaders: {}
};

function TokeniseString(line) {
    return line.split('|');
}

function ParseGlobalExtractHeaders(globalHeaders) {
    let model = {
        columns: [],
        length: 0
    };
    let tokens = TokeniseString(globalHeaders);
    console.log(tokens[0]);
    tokens.forEach(token => {
        if (isNaN(token)) {
            model.columns.push(token);
        }
    });
    model.length = globalHeaders.length;
    return model;
}

function ParseExtractUsingEventStream() {

    let account = null;
    const reader = fs.createReadStream(bigfile, {flags: 'r'})
        .pipe(es.split('\r\n'))
        .pipe(es.mapSync(function (line) {
            if (line.startsWith('Section|')) {
                let globalHeader = ParseGlobalExtractHeaders(line);
                console.log(globalHeader);
                statementObject.GlobalColumnHeaders = globalHeader;
            }
            account = ParseAccountsByLine(line, statementObject, account);
            //console.log(line);
            //cb(null, line)
        }).on('end',  () => {
            console.log('There will be no more data.');
            if (account){
                statementObject.accounts.push(account);
            }
        }));
}

function ParseExtract() {
    ParseExtractUsingEventStream();
}

function ParseAccountsByLine(line, statementObject, account) {
    //statementObject.accounts
    if (line.startsWith('N/A|')) {
        let count = 0;
        if (account) {
            statementObject.accounts.push(account);
        }
        account = {
            details: {},
            columns: [],
            tableRowdata: []
        };
        let tokens = TokeniseString(line);
        tokens.forEach(token => {
            if (token==="")
            {
                count++;
            }
            else{
                account.details[statementObject.GlobalColumnHeaders.columns[count++]] = token;
            }
        });
        return account;
    }

    if (account) {
        let tokens = TokeniseString(line);
        let count=0;
        let i = -1;
        let row = {
            columns: []
        };
        tokens.forEach(token => {
            i++;
            if (i < 3 || i > 8)
            {
                return;
            }
            if (token === "")
            {
                count++;
            }else{
                row.columns[count++] = token;
            }
        });
        account.tableRowdata.push(row);
    }
    return account;
}

exports.ParseExtract = ParseExtract;
exports.statementObject = statementObject;