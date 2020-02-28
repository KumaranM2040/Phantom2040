const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'iotuser',
    password: 'Password1',
    connectionLimit: 20
});
console.log('Number of Active MariaDB connections is: '+ pool.activeConnections());
async function Initialise() {
    console.log('Current active connections:' + pool.activeConnections());
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
    try {
        conn = await pool.getConnection();
        console.log("Executing Query");
        const rows = await conn.query(query);
        console.log(rows[0]); //[ {val: 1}, meta: ... ]
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = {
    Initialise: Initialise,
    ExecuteNonQuery: ExecuteNonQuery,
    ExecuteQuery: ExecuteQuery
}