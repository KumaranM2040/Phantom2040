const db = require('../db-connector');

module.exports = class Users {
    constructor(id, username, password, loginTime){
        this.id = id;
        this.username = username;
        this.password = password;
        this.loginTime = loginTime;
    }

    static isValidUser(username, password){
        return db.ExecuteQuery('select 1 from iotDb.users where Username='+username+' AND Password='+password);
    }
}