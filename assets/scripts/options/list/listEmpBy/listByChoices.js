const listEmpByDep = require('../listEmpBy/listEmpByDep')
const listEmpByMan = require('../listEmpBy/listEmpByMan')
const connection = require('../../../connection')

const listAll = async () => {
    const list = await connection.query(
        `SELECT * FROM employee`
    )
    console.table(list)
}

const choices = {
    'all': listAll,
    'dep': listEmpByDep,
    'man': listEmpByMan,
}

module.exports = choices;