const mysql = require('mysql2')

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'employees'
    },
    console.log('Connected to employees database')
)

module.exports = connection;