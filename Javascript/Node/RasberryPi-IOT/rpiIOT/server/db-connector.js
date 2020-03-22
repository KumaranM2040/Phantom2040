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

function mysql2MariadbPlaceholderTranslator(statement) {

    if (statement.query.includes("??")) {
        statement.query = statement.query.replace("??", statement.payload[0]);
        statement.payload = statement.payload.slice(1);
    }
}

async function ExecuteQuery(query, payload) {
    let conn;
    let rows;
    let statement = { query, payload };
    console.log(query);
    try {
        conn = await pool.getConnection();
        console.log("Executing Query");

        mysql2MariadbPlaceholderTranslator(statement);
        rows = await conn.query(statement.query, statement.payload);
    } catch (err) {
        console.log(`Code: ${err.code} Message${err.stack}`);
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
    ExecuteQuery: ExecuteQuery,
}