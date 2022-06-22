const inquirer = require('inquirer')
const connection = require('../../../../config/connection')
const restart = require('../restart')

const newEmployee = async () => {
    try {
        const roles = await connection.query(
            `SELECT * FROM role`
        )
        const managers = await connection.query(
            `SELECT * FROM employee WHERE manager_id IS null`
        )

        const {
            firstName,
            lastName,
            role,
            hasManager,
            currentManager
        } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the new employee?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the new employee?',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
            },
            {
                type: 'list',
                name: 'hasManager',
                message: 'Does this person have a manager?',
                choices: [
                    {name: 'Yes', value: true},
                    {name: 'No', value: false}
                ]
            },
            {
                type: 'list',
                name: 'currentManager',
                message: 'Who is the manager for this new employee?',
                choices: [
                    ...managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
                    'Cancel'
                ],
                when: res => res.hasManager ? true : false
            }
        ])
        if (currentManager === 'Cancel') return restart()
        const manager = hasManager ? currentManager : null

        await connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${firstName}","${lastName}","${role}", ${manager})`
        )
        console.log(`${firstName} ${lastName} has been added to current employees.`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = newEmployee;