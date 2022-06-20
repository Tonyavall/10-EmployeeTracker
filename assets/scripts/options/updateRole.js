const connection = require('../connection')
const inquirer = require('inquirer')
const restart = require('./restart')

const updateRole = async () => {
    try {
        const roles = await connection.query(
            'SELECT * FROM role'
        )
        const employees = await connection.query(
            'SELECT * FROM employee'
        )

        const { employee_choice, role_choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_choice',
                message: "Who's role would you like to change?",
                choices: employees.map(employee => {
                    return ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee
                    })
                })
            },
            {
                type: 'list',
                name: 'role_choice',
                message: 'What is the new role for this person?',
                choices: roles.map(role => ({ name: role.title, value: role }))
            }
        ])

        await connection.query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [role_choice.id, employee_choice.id]
        )
        console.log(`${employee_choice.first_name} ${employee_choice.last_name} has been updated to ${role_choice.title}`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = updateRole;