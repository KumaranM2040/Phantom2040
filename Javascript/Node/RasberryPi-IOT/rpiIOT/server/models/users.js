const db = require('../db-connector');

module.exports = class Users {
    constructor(id, username, password, loginTime){
        this.id = id;
        this.username = username;
        this.password = password;
        this.loginTime = loginTime;
    }

    static async isValidUser(username, password){
        console.log('userinput: ' + username + password)
        return await db.ExecuteQuery(`select * from iotDb.users where Username='${username}' AND Password='${password}'`);
        // return new Promise(function (resolve, reject){
        //     let a = db.ExecuteQuery(`select * from iotDb.users where Username='${username}' AND Password='${password}'`);
        //     resolve(a);
        // });
    }
}