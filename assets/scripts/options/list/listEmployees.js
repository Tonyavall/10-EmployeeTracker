const inquirer = require('inquirer');
const connection = require('../../connection')
const restart = require('../restart');

const listEmpByDep = require('./listEmpBy/listEmpByDep')
const listEmpByMan = require('./listEmpBy/listEmpByMan')

const listEmployees = async () => {
    try {
        const { viewBy } = await inquirer.prompt([
            {
                type: 'list',
                name: 'viewBy',
                choices: [
                    {name: 'View All Employees', value: 'all'},
                    {name: 'View Employees by Department', value: 'dep'},
                    {name: 'View Employees by Manager', value: 'man'},
                    {name: 'Cancel', value: false}
                ]
            }
        ])
        if (!viewBy) return restart()

        const choices = {
            'all': async ()=> {
                const list = await connection.query(
                    `SELECT * FROM employee`
                )
                console.table(list)
            },
            'dep': listEmpByDep,
            'man': listEmpByMan,
            'default': restart
        }
        await (choices[viewBy] || choices['default'])()

    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = listEmployees;