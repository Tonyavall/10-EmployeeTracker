const inquirer = require('inquirer')

const menu = require('./assets/scripts/menu')

const listTable = require('./assets/scripts/options/listTable')
const newDepartment = require('./assets/scripts/options/newDepartment')
const newEmployee = require('./assets/scripts/options/newEmployee')
const newRole = require('./assets/scripts/options/newRole')
const updateRole = require('./assets/scripts/options/updateRole')
const deleteDepartment = require('./assets/scripts/options/deleteDepartment')
const deleteEmployee = require('./assets/scripts/options/deleteEmployee')
const deleteRole = require('./assets/scripts/options/deleteRole')


const promptUser = questions => inquirer.prompt(questions)

const init = async () => {
    const { options } = await promptUser(menu)

    switch (options) {
        case '':
            console.log("Goodbye!")
            process.exit()

        case 'departments_list':
            restart = await listTable('department');
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'roles_list':
            restart = await listTable('role');
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'employees_list':
            restart = await listTable('employee');
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'departments_add':
            restart = await newDepartment()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'roles_add':
            restart = await newRole()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'employees_add':
            restart = await newEmployee()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'roles_update':
            restart = await updateRole()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'departments_delete':
            restart = await deleteDepartment()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'roles_delete':
            restart = await deleteRole()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break

        case 'employees_delete':
            restart = await deleteEmployee()
            restart ? init()
                : (console.log("Goodbye!"), process.exit())
            break
    }

}

init()