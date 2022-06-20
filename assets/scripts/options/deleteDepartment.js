const inquirer = require('inquirer');
const connection = require('../connection')
const restart = require('./restart');

const deleteDepartment = async () => {
    try {
        const departments = await connection.query(
            `SELECT * FROM department`,
        )
        const { department } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'What department would you like to delete?',
                choices: [
                    ...departments.map(department => ({ name: department.name, value: department })),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!department) return restart()

        await connection.query(
            `DELETE FROM department WHERE id = ${department.id}`
        )
        console.log(`Department ${department.name} has been removed.`)

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