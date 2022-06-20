const connection = require('../connection')
const restart = require('./restart')

const newDepartment = async depName => {
    try {
        await connection.query(
            `INSERT INTO department (name) VALUES ("${depName}")`
        )
        console.log(`${depName} has been added to departments.`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = newDepartment;