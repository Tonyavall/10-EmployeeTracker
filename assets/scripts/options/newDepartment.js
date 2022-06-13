const connection = require('../connection')

const newDepartment = depName => {
    connection.query(
        `INSERT INTO department (name) VALUES ("${depName}")`,
        (err, result) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`Number of affect rows: ${result.affectedRows}`)
        }
        // List resulting table here
    )
}

module.exports = newDepartment;