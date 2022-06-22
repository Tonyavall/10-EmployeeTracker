const inquirer = require('inquirer');
const restart = require('../restart');

const choices = require('./listEmpBy/listByChoices')

const listEmployees = async () => {
    try {
        const { listBy } = await inquirer.prompt([
            {
                type: 'list',
                name: 'listBy',
                choices: [
                    {name: 'View All Employees', value: 'all'},
                    {name: 'View Employees by Department', value: 'dep'},
                    {name: 'View Employees by Manager', value: 'man'},
                    {name: 'Cancel', value: false}
                ]
            }
        ])
        if (!listBy) return restart()

        // Object version of a switch case. Object contains methods.
        // Variable to check for is listBy
        await choices[listBy]()

    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = listEmployees;