// Callback functions. If the callback returns true the question in questions array will be asked.
const addDepartment = answers => {
    return answers.options === 'departments_add' ? true : false
}

const addRole = answers => {
    return answers.options === 'roles_add' ? true : false
}

const questions = [
    {
        type: 'list',
        name: 'options',
        choices: [
            {name: 'View All Departments', value: 'departments_list'},
            {name: 'View All Roles', value: 'roles_list'},
            {name: 'View All Employees', value: 'employees_list'},
            {name: 'Add a Department', value: 'departments_add'},
            {name: 'Add a Role', value: 'roles_add'},
            {name: 'Add an Employee', value: 'employees_add'},
            {name: 'Update an Employee Role', value: 'roles_update'},
            {name: 'Delete a Department', value: 'departments_delete'},
            {name: 'Delete a Role', value: 'roles_delete'},
            {name: 'Delete an Employee', value: 'employees_delete'},
            {name: 'Cancel', value: ''}
        ],
    },
    {
        type: 'input',
        name: 'department_name',
        message: 'What will the name of the new department be?',
        when: addDepartment
    },
    {
        type: 'input',
        name: 'roles_name',
        message: 'What will the name of the role be?',
        when: addRole
    },
    {
        type: 'input',
        name: 'roles_salary',
        message: `What is the salary for the role?`,
        when: addRole
    },
    {
        type: 'input',
        name: 'roles_department',
        message: 'What is the department for the role?',
        when: addRole
    }
]

module.exports = questions;