const inquirer = require('inquirer')
const connection = require('../../../../config/connection')
const restart = require('../restart')

const newRole = async () => {
    try {
        const departments = await connection.query(
            `SELECT * FROM department`
        )

        const { roleName, salary, department } = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What will the name of the role be?',
            },
            {
                type: 'number',
                name: 'salary',
                message: `What is the salary for the role?`,
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department for the role?',
                choices: [
                    ...departments.map(department => ({ name: department.name, value: department })),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!department) return restart()

        await connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES ("${roleName}", ${salary}, ${department.id})`
        )
        console.log(`${roleName} has been added to roles under ${department.name}.`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = newRole;