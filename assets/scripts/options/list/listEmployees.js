const inquirer = require('inquirer');
const restart = require('../restart');

const choices = require('./listEmpBy/listByChoices')

const listEmployees = async () => {
    try {
        const { viewBy } = await inquirer.prompt([
            {
                type: 'list',
                name: 'viewBy',
                choices: [
                    {name: 'View All Employees', value: 'all'},
                    {name: 'View Employees by Department', value: 'dep'},
                    {name: 'View Employees by Manager', value: 'man'},
                    {name: 'Cancel', value: false}
                ]
            }
        ])
        if (!viewBy) return restart()

        // Object version of a switch case. Object contains methods.
        // Param is viewBy
        await choices[viewBy]()

    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = listEmployees;