const inquirer = require('inquirer')
const fs = require('fs')
const connection = require('./assets/scripts/connection')

const questions = require('./assets/scripts/questions')
const listTable = require('./assets/scripts/listTable')
const newDepartment = require('./assets/scripts/newDepartment')

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
            newDepartment(department_name)
            break
        case 'roles_add':
            break
        case 'employees_add':
            break
        case 'roles_update':
            break
    }
}

init()