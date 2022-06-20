const connection = require('../connection')

const newRole = async (title, salary, department) => {
    await connection.query(
        `INSERT INTO role (title, salary, department_id)
        VALUES ("${title}", ${salary}, ${department})`,
        (err,result)=> {
            if (err) {
                return console.log(err.message)
            }
            console.log(`Number of affect rows: ${result.affectedRows}`)
        }
    )
}

module.exports = newRole;