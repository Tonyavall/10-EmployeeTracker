const connection = require('../../../config/connection')
const inquirer = require('inquirer')
const restart = require('./restart')

const updateManager = async () => {
    try {
        const employees = await connection.query(
            `SELECT * FROM employee WHERE manager_id IS NOT NULL`
        )
        const managers = await connection.query(
            `SELECT * FROM employee WHERE manager_id IS NULL`
        )

        const { employee, manager } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employees manager would you like to update?',
                choices: [
                    ...employees.map(
                        employee =>
                        ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee
                        })
                    ),
                    { name: 'Cancel', value: false }
                ]
            },
            {
                type: 'list',
                name: 'manager',
                message: 'What manager would you like to update them to?',
                choices: [
                    ...managers.map(
                        managers =>
                        ({
                            name: `${managers.first_name} ${managers.last_name}`,
                            value: managers
                        })
                    ),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!employee || !manager) return restart()

        await connection.query(
            `UPDATE employee SET manager_id = ${manager.id} WHERE id = ${employee.id}`
        )
        console.log(`${employee.first_name} ${employee.last_name} has been updated under manager ${manager.first_name} ${manager.last_name}`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = updateManager;