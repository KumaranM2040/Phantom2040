const fs = require('fs');

var chunkSize = 65536;
const bigfile = 'C:\\Work\\EmailingLoanStatementsToClient\\SAHL_LoanStatements_20190523\\SAHL_LoanStatements_20190523.txt';

const statementObject = {
    accounts: [],
    TableHeaders: {}
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
function ParseExtractUsingStream(){
    let buffer = [];
    var file = fs.createReadStream(bigfile);
    file.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
        buffer = HandleChunk(chunk, statementObject, buffer, chunk.length);
    });
    file.on('end', () => {
        console.log('There will be no more data.');
        HandleChunk("\r\n", statementObject, buffer, 1);
    });
}

function ParseExtractUsingReadChunk(){
    let buffer = [];
    var buf1 = Buffer.alloc(chunkSize), buf2 = Buffer.alloc(chunkSize);
    var fd = fs.openSync(bigfile, 'r');
    fs.read(fd, buf1, 0, chunkSize, null, function r(err, sz) {
        if(!sz) {
            fs.closeSync(fd);
            if (buffer.length){
                HandleChunk("\r\n", statementObject, buffer, 1);
            }
            return;
        }
        fs.read(fd, buf2, 0, chunkSize, null, function(err, sz) {
            if(!sz) {
                fs.closeSync(fd);
                if (buffer.length){
                    HandleChunk("\r\n", statementObject, buffer, 1);
                }
                return;
            }
            fs.read(fd, buf1, 0, chunkSize, null, r);
            buffer = HandleChunk(buf2.slice(0, sz), statementObject, buffer, sz);
            //hash.update(buf2.slice(0, sz));
        });
        buffer = HandleChunk(buf1.slice(0, sz), statementObject, buffer, sz);
        //hash.update(buf1.slice(0, sz));
    });
}

function ParseExtract() {
    ParseExtractUsingReadChunk();
    //ParseExtractUsingStream();
}

function HandleChunk(chunk, statementObject, buffer, size) {
    if (size< 65536) 
    {
        console.log(size);
    }
    if (chunk.length) {
        let chunkstr = chunk.toString();
        let index = 0;
        let finalStartSequence = 0;
        let accountCount = 0;

        let newlines = chunkstr.split('\r\n');
        if (buffer.length) {
            newlines.splice(0, 0, ...buffer);
            let firstLineInNewBuffer = newlines[buffer.length];
            let lastLineInPreviousBuffer = newlines[buffer.length - 1];
            //console.log(lastLineInPreviousBuffer);
            /* concatenate the strings and strip of line breaks as this is done after the initial tokenisation */
            //newlines[buffer.length-1] = lastLineInPreviousBuffer.concat(firstLineInNewBuffer).replace(/(\r\n|\n|\r)/gm,"");
            let combinedLine = lastLineInPreviousBuffer.concat(firstLineInNewBuffer);
            if (combinedLine.includes("\r\n")) {
                let tempArray = combinedLine.split('\r\n');
                newlines[buffer.length - 1] = tempArray[0];
                newlines[buffer.length] = tempArray[1];
            } else {
                newlines[buffer.length - 1] = combinedLine;
                newlines.splice(buffer.length, 1);
            }
        }
        newlines.forEach(line => {
            if (line.startsWith('Section|')) {
                let globalHeader = ParseGlobalExtractHeaders(line);
                console.log(globalHeader);
                statementObject.TableHeaders = globalHeader;
            }

            if (line.startsWith('N/A|')) {
                finalStartSequence = index;
                accountCount++;
            }
            index++;
        });
        //if (size === 65536){
        buffer = newlines.slice(finalStartSequence, index);
        newlines.splice(finalStartSequence, index - finalStartSequence);
        // }
        // else{
        //   console.log(size);
        // }
        ParseAccounts(newlines, statementObject, accountCount, size);
    }
    return buffer;
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

function ParseAccounts(newlines, statementObject, accountCount) {
    //statementObject.accounts
    let account = null;
    newlines.forEach(line => {
        if (line.startsWith('N/A|')) {
            let count = 0;
            if (account) {
                statementObject.accounts.push(account);
            }
            account = {
                details:{},
                columns: [],
                tableRowdata: []
            };
            let tokens = TokeniseString(line);
            tokens.forEach(token => {
                account.details[statementObject.TableHeaders.columns[count++]]=token;
                account.columns.push(token);
            });
        }

        if (account) {
            let tokens = TokeniseString(line);
            let row = {
                columns: []
            };
            tokens.forEach(token => {
                row.columns.push(token);
            });
            account.tableRowdata.push(row);
        }
    });
    if (account) {
        statementObject.accounts.push(account);
    }
}

exports.ParseExtract=ParseExtract;
exports.statementObject = statementObject;