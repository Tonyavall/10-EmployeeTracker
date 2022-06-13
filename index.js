const inquirer = require('inquirer')

const connection = require('./assets/scripts/connection')
const questions = require('./assets/scripts/questions')

const listTable = require('./assets/scripts/options/listTable')
const newDepartment = require('./assets/scripts/options/newDepartment')
// const newEmployee = require('./assets/scripts/options/newEmployee')
// const newRole = require('./assets/scripts/options/newRole')
const updateRole = require('./assets/scripts/options/updateRole')

const promptUser = () => inquirer.prompt(questions)

const init = async () => {
    const { 
        options,
        department_name,
        roles_name,
        roles_salary,
        roles_department,
        employee_firstname,
        employee_lastname,
        employee_role,
        employee_manager
    } = await promptUser()
    
    switch (options) {
        case 'departments_list':
            listTable('department')
            break
        case 'roles_list':
            listTable('role')
            break
        case 'employees_list':
            listTable('employee')
            break
        case 'departments_add':
            newDepartment(
                department_name
            )
            break
        case 'roles_add':
            newRole(
                roles_name,
                roles_salary,
                roles_department
            )
            break
        case 'employees_add':
            newEmployee(
                employee_firstname,
                employee_lastname,
                employee_role,
                employee_manager
            )
            break
        case 'roles_update':
            updateRole()
            break
    }
}

init()