const connection = require('../../../../../config/connection')

const listEmpAll = async () => {
    const list = await connection.query(
        `SELECT * FROM employee`
    )
    console.table(list)
}

module.exports = listEmpAll;