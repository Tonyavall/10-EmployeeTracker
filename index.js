const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'employees'
    },
    console.log('Connected to employees database')
)

db.query

const questions = require('./assets/scripts/questions')

const promptUser = () => inquirer.prompt(questions)

const init = async () => {
    const answers = await promptUser()
    
    switch (answers.options) {
        case 'departments':
            break
        case 'roles':
            break
        case 'employees':
            break
        case 'departments_add':
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