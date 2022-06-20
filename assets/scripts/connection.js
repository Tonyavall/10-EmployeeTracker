const mysql = require('mysql2');
const { promisify } = require("util");

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'employees'
    },
    console.log('Connected to employees database')
)

connection.query = promisify(connection.query)

module.exports = connection;