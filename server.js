const inquirer = require('inquirer');
// mysql connections
// const mysql = require('mysql2');

// connect to database
// figure this out

function initialChoice() {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
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
};

function promptChoices() {
    return initialChoice()
        .then(({ choice }) => {
            if (choice === 'View All Departments') {
                console.log('Confirmed View All Departments');
            }
            else if (choice === 'View All Roles') {
                console.log('Confirmed View All Roles');
            }
            else if (choice === 'View All Employees') {
                console.log('Confirmed View All Employees');
            }
            else if (choice === 'Add a Department') {
                console.log('Confirmed Add a Department');
            }
            else if (choice === 'Add a Role') {
                console.log('Confirmed Add a Role');
            }
            else if (choice === 'Add An Employee') {
                console.log('Confirmed Add An Employee');
            }
            else if (choice === 'Update Employee Role') {
                console.log('Confirmed Update Employee Role');
            }
            else {
                return null;
            }
        })
}

promptChoices();