const inquirer = require('inquirer')
const connection = require('../connection')

const newEmployee = async (firstName, lastName, role, manager) => {
    const roles = await connection.query(
        `SELECT * FROM role`
    )
    const managers = await connection.query(
        `SELECT * FROM employee`
    )

    const {
        employee_firstname,
        employee_lastname,
        employee_role,
        employee_manager
    } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_firstname',
            message: 'What is the first name of the new employee?',
        },
        {
            type: 'input',
            name: 'employee_lastname',
            message: 'What is the last name of the new employee?',
        },
        {
            type: 'list',
            name: 'employee_role',
            message: 'What is the role of the new employee?',
            choices: roles.map(role=> role.title)
        },
        {
            type: 'input',
            name: 'employee_manager',
            message: 'Who is the manager for this new employee?',
        }
    ])

    await connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${firstName}","${lastName}","${role}","${manager}")`,
        (err, result) => {
            if (err) {
                return console.log(err)
            }
            console.log(result.affectedRows)
        }
    )
}

module.exports = newEmployee;