const inquirer = require('inquirer')
const connection = require('../../connection')
const restart = require('../restart')

const newDepartment = async () => {
    try {
        const { addNew, department } = await inquirer.prompt([
            {
                type: 'list',
                name: 'addNew',
                message: 'Would you like to add a new department?',
                choices: [
                    {name: 'Yes', value: true},
                    {name: 'No', value: false}
                ]
            },
            {
                type: 'input',
                name: 'department',
                message: 'What will the name of the new department be?',
                when: res=> res.addNew ? true : false
            }
        ])
        if (!addNew) return restart()

        await connection.query(
            `INSERT INTO department (name) VALUES ("${department}")`
        )
        console.log(`${department} has been added to departments.`)
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = newDepartment;