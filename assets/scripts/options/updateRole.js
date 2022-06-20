const connection = require('../connection')
const inquirer = require('inquirer')

const updateRole = async () => {
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
                    value: employee.id
                })
            })
        },
        {
            type: 'list',
            name: 'role_choice',
            message: 'What is the new role for this person?',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
    ])

    await connection.query(
        `UPDATE employee SET role_id = ? WHERE id = ?`,
        [role_choice, employee_choice],
        (err, result) => {
            if (err) {
                return console.log(err.message)
            }
            console.log('Updated employee role.', result.info)
        }
    )
}

module.exports = updateRole;