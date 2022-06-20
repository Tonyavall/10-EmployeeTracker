const inquirer = require('inquirer');
const connection = require('../connection')
const restart = require('./restart');

const deleteRole = async () => {
    try {
        const roles = await connection.query(
            `SELECT * FROM role`
        )
        console.log(roles)
        const { role } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role would you like to delete?',
                choices: [
                    ...roles.map(role => ({ name: role.title, value: role })),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!role) return restart()

        await connection.query(
            `DELETE FROM role WHERE id = ${role.id} `
        )
        console.log(`${role.title} has been removed from roles.`)

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