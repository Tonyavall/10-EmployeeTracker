const connection = require('./connection')

const listTable = listName => {
    connection.query(`SELECT * FROM ${listName}`, 
        (err, results) => {
            if (err) {
                console.log(err.message)
            }
            console.table(results)
        }
    )
}

module.exports = listTable;