const inquirer = require('inquirer')
const restart = require('../../restart')
const connection = require('../../../connection')


const listEmpByMan = async () => {
    try {
        const managers = await connection.query(
            `SELECT * FROM employee WHERE manager_id IS null`
        )

        const { manager } = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: 'Please pick a manager.',
                choices: [
                    ...managers.map(
                        manager => (
                            { 
                                name: `${manager.first_name} ${manager.last_name}`, 
                                value: manager 
                            }
                        )
                    ),
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (!manager) return restart()

        const list = await connection.query(
            `SELECT * FROM employee WHERE manager_id = ${manager.id}`
        )
        if (!list) return console.log('There are no employees under this manager:(')
        console.table(list)
    } catch (err) {
        console.log(err)
    }
}

module.exports = listEmpByMan;