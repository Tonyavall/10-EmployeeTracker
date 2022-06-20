const inquirer = require('inquirer')

const restart = async () => {
    const { restart } = await inquirer.prompt([
        {
            type: 'list',
            name: 'restart',
            message: 'Would you like to go back to the menu?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false }
            ]
        }
    ])
    return restart
}

module.exports = restart;
