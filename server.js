const inquirer = require('inquirer');
// mysql connections
// const mysql = require('mysql2');

// connect to database
// figure this out

function initialPrompt() {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'initialChoice',
            message: 'What would you like to do?',
            choices: ['View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role', 
                    'Add An Employee',
                    'Update Employee Role']
        }
    )
}

initialPrompt();