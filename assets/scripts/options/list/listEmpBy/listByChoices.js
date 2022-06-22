const listEmpByDep = require('../listEmpBy/listEmpByDep')
const listEmpByMan = require('../listEmpBy/listEmpByMan')
const listEmpAll = require('./listEmpAll')

const choices = {
    'all': listEmpAll,
    'dep': listEmpByDep,
    'man': listEmpByMan,
}

module.exports = choices;