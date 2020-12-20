const inquirer = require('inquirer');
// mysql connections
// const mysql = require('mysql2');

// connect to database
// figure this out

initialChoice = () => {
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

promptChoices = () => {
    return initialChoice()
        .then(({ choice }) => {
            if (choice === 'View All Departments') {
                viewDepartments();
            }
            else if (choice === 'View All Roles') {
                viewRoles();
            }
            else if (choice === 'View All Employees') {
                viewEmployees();
            }
            else if (choice === 'Add a Department') {
                return addDepartment()
                    // .then(({ department }) => new Department(department));
            }
            else if (choice === 'Add a Role') {
                addRole();
            }
            else if (choice === 'Add An Employee') {
                addEmployee();
            }
            else if (choice === 'Update Employee Role') {
                updateEmployeeRole();
            }
            else {
                return null;
            }
        })
};

viewDepartments = () => {
    console.log('Confirmed View All Departments');
    // connect table
};

viewRoles = () => {
    console.log('Confirmed View All Roles');
    // connect table
};

viewEmployees = () => {
    console.log('Confirmed View All Employees');
    // connect table
};

addDepartment = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: 'Enter the new departments name:',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
        // Add to the table still
    )
};

addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Enter the name of the role:',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:'
        }
        // department which would be connected to the department table 

        // add role to the database
    ])
};

addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employees first name:',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employees last name:',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name!');
                    return false;
                }
            }
        }
        // role which will be based on the connection to the table

        // manager that is connected to the employee table

        // add to the employee table
    ])
};

updateEmployeeRole = () => {
    console.log('Confirmed Update Employee Role');
}

promptChoices();