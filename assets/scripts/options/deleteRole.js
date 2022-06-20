const inquirer = require('inquirer');
const connection = require('../connection')
const restart = require('./restart');

const deleteRole = async () => {
    try {
        const rolesList = await connection.query(
            `SELECT * FROM role`
        )

        const { roles: userChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'What role would you like to delete?',
                choices: rolesList.map(role => ({ name: role.title, value: role.id }))
            }
        ])
        await connection.query(
            `DELETE FROM role WHERE id = ${userChoice} `
        )
        console.log(`Role ${userChoice} has been removed.`)
        
        const { deleteMore } = await inquirer.prompt([
            {
                type: 'list',
                name: `deleteMore`,
                message: 'Would you like to delete more roles?',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'No', value: false }
                ]
            }
        ])
        if (deleteMore) return deleteRole()
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = deleteRole;