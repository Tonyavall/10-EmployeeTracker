const inquirer = require('inquirer')
const restart = require('../../restart')
const connection = require('../../../connection')

const listEmpByDep = async () => {
    try {
        const departments = await connection.query(
            `SELECT * FROM department`
        )

        const { department } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Please pick a department.',
                choices: [
                    ...departments.map(department => ({ name: department.name, value: department })),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!department) return restart()

        const list = await connection.query(
            `SELECT * FROM employee WHERE id = ${department.id}`
        )
        console.table(list)
    } catch (err) {
        console.log(err)
    }
}

module.exports = listEmpByDep;