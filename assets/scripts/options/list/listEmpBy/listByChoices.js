const listEmpByDep = require('../listEmpBy/listEmpByDep')
const listEmpByMan = require('../listEmpBy/listEmpByMan')
const listEmpAll = require('./listEmpAll')
const connection = require('../../../connection')

const choices = {
    'all': listEmpAll,
    'dep': listEmpByDep,
    'man': listEmpByMan,
}

module.exports = choices;