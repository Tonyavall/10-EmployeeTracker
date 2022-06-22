const connection = require('../../../../config/connection')
const inquirer = require('inquirer')
const restart = require('../restart')

const listDepBudget = async () => {
    try {
        const departments = await connection.query(
            `SELECT * FROM department`
        )

        const { department } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: "Which department's budget would you like to view?",
                choices: [
                    ...departments.map(
                        department =>
                        ({
                            name: department.name,
                            value: department
                        })
                    ),
                    { name: 'Cancel', value: false }
                ]
            },
        ])
        if (!department) return restart()

        const list = await connection.query(
            `SELECT * FROM employee
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
            WHERE department_id = ${department.id}`
        )

        console.table(
            {
                Department: department.name,
                Total_Budget: list.map(employee => parseInt(employee.salary)).reduce((a,b)=> a+b, 0)
            }
        )
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = listDepBudget;