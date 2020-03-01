const mariadb = require('mariadb');
const options = {
    host: 'localhost',
    port: '3306',
    user: 'iotuser',
    password: 'Password1',
    database: 'iotDb',
    connectionlimit: 20
};

const pool = mariadb.createPool(options);

async function InitialiseMariaDBConnection() {
    console.log('Current active connections:' + pool.activeConnections());
    return ExecuteQuery("Select * from iotDb.users")
}

async function ExecuteNonQuery(statement, payload) {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Executing NonQuery");
        const res = await conn.query(statement, payload);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function ExecuteQuery(query) {
    let conn;
    let rows;
    console.log(query);
    try {
        conn = await pool.getConnection();
        console.log("Executing Query");
        rows = await conn.query(query);
        //return rows;
        //console.log(rows[0]); //[ {val: 1}, meta: ... ]
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
        return rows;

    }
}

module.exports = {
    InitialiseMariaDBConnection: InitialiseMariaDBConnection,
    ExecuteNonQuery: ExecuteNonQuery,
    ExecuteQuery: ExecuteQuery,
}