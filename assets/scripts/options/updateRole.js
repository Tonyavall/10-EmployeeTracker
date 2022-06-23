const connection = require('../../../config/connection')
const inquirer = require('inquirer')
const restart = require('./restart')

const updateRole = async () => {
    try {
        const roles = await connection.query(
            'SELECT * FROM role'
        )
        const employees = await connection.query(
            'SELECT * FROM employee'
        )
        // This is non manager members
        const staff = await connection.query(
            'SELECT * FROM employee WHERE manager_id IS NOT NULL'
        )
        const managers = await connection.query(
            'SELECT * FROM employee WHERE manager_id IS NULL'
        )

        const { choices, employee, role, promote, demote, validate } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to update?',
                choices: [
                    { name: 'Change an Employee Role/Job', value: 0 },
                    { name: 'Promote an Employee to Manager', value: 1 },
                    { name: 'Demote a Manager to Staff/Member', value: 2 },
                    { name: 'Cancel', value: false }
                ]
            },
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: [
                    ...employees.map(
                        employee =>
                        ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee
                        })
                    ),
                    { name: 'Cancel', value: false }
                ],
                when: res => res.choices === 0 ? true : false
            },
            {
                type: 'list',
                name: 'role',
                message: 'What role would you like to update them to?',
                choices: [
                    ...roles.map(
                        role =>
                        ({
                            name: role.title,
                            value: role
                        })
                    ),
                    { name: 'Cancel', value: false }
                ],
                when: res => res.choices === 0 ? true : false
            },
            {
                type: 'list',
                name: 'promote',
                message: 'Which current employee would you like to promote to Manager?',
                choices: [
                    ...staff.map(
                        member =>
                        ({
                            name: `${member.first_name} ${member.last_name}`,
                            value: member
                        })
                    ),
                    { name: 'Cancel', value: false }
                ],
                when: res => res.choices === 1 ? true : false
            },
            {
                type: 'list',
                name: 'demote',
                message: 'Which current Manager would you like to demote to staff/member?',
                choices: [
                    ...managers.map(
                        manager =>
                        ({
                            name: `${manager.first_name} ${manager.last_name}`,
                            value: manager
                        })
                    ),
                    { name: 'Cancel', value: false }
                ],
                when: res => res.choices === 2 ? true : false
            },
            {
                type: 'list',
                name: 'validate',
                message: 'Are you sure?',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'Cancel', value: false }
                ]
            }
        ])
        if (
            choices === false || employee === false
            || role === false || validate === false
            || promote === false || demote === false
        ) return restart()

        if (choices === 2) {
            var { assign } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'assign',
                    message: 'Which manager would you like to assign them under?',
                    choices: [
                        ...managers.map(
                            manager =>
                            ({
                                name: `${manager.first_name} ${manager.last_name}`,
                                value: manager
                            })
                        ).filter(manager => manager.value.id !== demote.id),
                        { name: 'Cancel', value: false }
                    ],
                }
            ])
            if (assign === false) return restart()
        }

        if (choices === 0) {
            await connection.query(
                `UPDATE employee SET role_id = ${role.id}
                 WHERE id = ${employee.id}`
            )
            console.log(
                `${employee.first_name} ${employee.last_name} has been updated to ${role.title}`
            )
        } else if (choices === 1) {
            await connection.query(
                `UPDATE employee SET manager_id = NULL
                 WHERE id = ${promote.id}`
            )
            console.log(
                `${promote.first_name} ${promote.last_name} has been updated to Manager`
            )
        } else {
            await connection.query(
                `UPDATE employee SET manager_id = ${assign.id}
                 WHERE id = ${demote.id}`
            )
            console.log(
                `${demote.first_name} ${demote.last_name} has been updated to Staff/Employee under ${assign.first_name} ${assign.last_name}`
            )
        }
    } catch (err) {
        console.log(err)
    }
    return restart()
}

module.exports = updateRole;