const inquirer = require('inquirer');
const connection = require('../connection')
const restart = require('./restart');

const deleteEmployee = async () => {
    try {
        const employees = await connection.query(
            `SELECT * FROM employee`
        )

        const { employee: userChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'What employee would you like to delete?',
                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
            }
        ])

        await connection.query(
            `DELETE FROM employee WHERE id = ${userChoice}`
        )
        console.log(`${userChoice} has been delete from employees`)
        
        const { deleteMore } = await inquirer.prompt([
            {
                type: 'list',
                name: `deleteMore`,
                message: 'Would you like to delete more employees?',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'No', value: false }
                ]
            }
        ])
        if (deleteMore) return deleteEmployee()
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = deleteEmployee;