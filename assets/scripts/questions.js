// Callback functions. If the callback returns true the question in questions array will be asked.
const addDepartment = answers => {
    return answers.options === 'departments_add' ? true : false
}

const addRole = answers => {
    return answers.options === 'roles_add' ? true : false
}

const addEmployee = answers => {
    return answers.options === 'employees_add' ? true : false
}

const questions = [
    {
        type: 'list',
        name: 'options',
        choices: [
            {name: 'View All Departments', value: 'departments'},
            {name: 'View All Roles', value: 'roles'},
            {name: 'View All Employees', value: 'employees'},
            {name: 'Add a Department', value: 'departments_add'},
            {name: 'Add a Role', value: 'roles_add'},
            {name: 'Add an Employee', value: 'employees_add'},
            {name: 'Update an Employee Role', value: 'roles_update'}
        ],
    },
    {
        type: 'input',
        name: 'departments_name',
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
    },
    {
        type: 'input',
        name: 'employee_firstname',
        message: 'What is the first name of the new employee?',
        when: addEmployee
    },
    {
        type: 'input',
        name: 'employee_lastname',
        message: 'What is the last name of the new employee?',
        when: addEmployee
    },
    {
        type: 'input',
        name: 'employee_role',
        message: 'What is the role of the new employee?',
        when: addEmployee
    },
    {
        type: 'input',
        name: 'employee_manager',
        message: 'Who is the manager for this new employee?',
        when: addEmployee
    }
]

module.exports = questions;