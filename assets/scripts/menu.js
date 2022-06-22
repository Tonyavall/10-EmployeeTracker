const menu = [
    {
        type: 'list',
        name: 'options',
        choices: [
            {name: 'View All Departments', value: 'departments_list'},
            {name: 'View Departments Budget', value: 'departments_budget'},
            {name: 'View All Roles', value: 'roles_list'},
            {name: 'View Employees', value: 'employees_list'},
            {name: 'Add a Department', value: 'departments_add'},
            {name: 'Add a Role', value: 'roles_add'},
            {name: 'Add an Employee', value: 'employees_add'},
            {name: 'Update an Employee Role', value: 'roles_update'},
            {name: 'Update an Employee Manager', value: 'manager_update'},
            {name: 'Delete a Department', value: 'departments_delete'},
            {name: 'Delete a Role', value: 'roles_delete'},
            {name: 'Delete an Employee', value: 'employees_delete'},
            {name: 'Cancel', value: ''}
        ],
        loop: false
    }
]

module.exports = menu;