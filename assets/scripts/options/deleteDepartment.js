const inquirer = require('inquirer');
const connection = require('../connection')
const restart = require('./restart');

const deleteDepartment = async () => {
    try {
        const departmentsList = await connection.query(
            `SELECT * FROM department`,
        )
        const { department: userChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'What department would you like to delete?',
                choices: departmentsList.map(department => ({ name: department.name, value: department.id }))
            }
        ])
        await connection.query(
            `DELETE FROM department WHERE id = ${userChoice}`
        )
        console.log(`Department ${userChoice} has been removed.`)

        const { deleteMore } = await inquirer.prompt([
            {
                type: 'list',
                name: `deleteMore`,
                message: 'Would you like to delete more departments?',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'No', value: false }
                ]
            }
        ])
        if (deleteMore) return deleteDepartment()
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = deleteDepartment;