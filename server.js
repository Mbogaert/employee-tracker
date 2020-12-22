const inquirer = require("inquirer");

// mysql connections
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "company_db",
  password: "NEW_password1",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  promptChoices();
});

const initialChoice = () => {
  return inquirer.prompt({
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add An Employee",
      "Update Employee Role",
      "Exit",
    ],
  });
};

const promptChoices = () => {
  return initialChoice().then(({ choice }) => {
    if (choice === "View All Departments") {
      viewDepartments();
    } else if (choice === "View All Roles") {
      viewRoles();
    } else if (choice === "View All Employees") {
      viewEmployees();
    } else if (choice === "Add a Department") {
      return addDepartment();
    } else if (choice === "Add a Role") {
      addRole();
    } else if (choice === "Add An Employee") {
      addEmployee();
    } else if (choice === "Update Employee Role") {
      updateEmployeeRole();
    } else {
      connection.end();
    }
  });
};

const viewDepartments = () => {
  let query = `SELECT id AS ID, name AS Department FROM departments;`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptChoices();
  });
};

const viewRoles = () => {
  let query = `SELECT title AS Job, roles.id AS ID, departments.name AS Department, salary AS Salary FROM roles INNER JOIN departments ON roles.departments_id = departments.id;`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptChoices();
  });
};

const viewEmployees = () => {
  let roleDepartmentQuery = `SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles INNER JOIN departments ON roles.departments_id = departments.id`;
  let employeeRoleQuery = `SELECT employees.employee_id, CONCAT_WS(' ', first_name, last_name) AS name, manager_id, roles_departments.title, roles_departments.salary, roles_departments.department_name FROM employees INNER JOIN (${roleDepartmentQuery}) AS roles_departments ON employees.role_id = roles_departments.id`;
  let query = `SELECT employee_role.employee_id, employee_role.name, employee_role.title, employee_role.salary, employee_role.department_name, CONCAT_WS(' ', manager.first_name, manager.last_name) AS manager FROM (${employeeRoleQuery}) AS employee_role LEFT JOIN employees AS manager ON employee_role.manager_id = manager.employee_id`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptChoices();
  });
};

const addDepartment = () => {
  return inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the new departments name:",
      validate: (departmentInput) => {
        if (departmentInput) {
          return true;
        } else {
          console.log("Please enter a department!");
          return false;
        }
      },
    })
    .then((department) => {
      const query = `INSERT INTO departments SET ?`;
      connection.query(query, department, (err, res) => {
        if (err) throw err;
        promptChoices();
      });
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the name of the role:",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("Please enter a role!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for this role:",
      },
      {
        type: "list",
        name: "departments_id",
        message: "Select a Department:",
        choices: () =>
          connection
            .promise()
            .query(`SELECT * FROM departments`)
            .then(([res]) => res.map(({ id, name }) => ({ name, value: id }))),
      },
      // add role to the database
    ])
    .then((role) => {
      const query = `INSERT INTO roles SET ?`;
      connection.query(query, role, (err, res) => {
        if (err) throw err;
        promptChoices();
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employees first name:",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("Please enter a first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employees last name:",
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("Please enter a last name!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role_id",
        message: "Select a role:",
        choices: () =>
          connection
            .promise()
            .query(`SELECT * FROM roles`)
            .then(([res]) =>
              res.map(({ id, title }) => ({ name: title, value: id }))
            ),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select a Manager:",
        choices: () =>
          connection
            .promise()
            .query(
              `SELECT employee_id, CONCAT_WS(' ', first_name, last_name) AS name FROM employees`
            )
            .then(([res]) => {
              const managerChoices = res.map(({ id, name }) => ({
                name,
                value: id,
              }));
              managerChoices.push({ name: "none", value: null });
              return managerChoices;
            }),
      },
    ])
    .then((employee) => {
      const query = `INSERT INTO employees SET ?`;
      connection.query(query, employee, (err, res) => {
        if (err) throw err;
        promptChoices();
      });
    });
};

const updateEmployeeRole = () => {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select employee who's role you would like to update:",
          choices: () =>
            connection
              .promise()
              .query(
                `SELECT employee_id, CONCAT_WS(' ', first_name, last_name) AS name FROM employees`
              )
              .then(([res]) => {
                const employeeChoices = res.map(({ id, name }) => ({
                  name,
                  value: id,
                }));
                employeeChoices.push({ name: "none", value: null });
                return employeeChoices;
              }),
        },
        {
          type: "list",
          name: "title",
          message: "Select a new role for this employee:",
          choices: () =>
            connection
              .promise()
              .query(`SELECT title AS name FROM roles`)
              .then(([res]) => {
                const roleChoices = res.map(({ id, name }) => ({
                  name,
                  value: id,
                }));
                return roleChoices;
              }),
        },
      ])
      .then((answer) => {
        console.log(answer);
      
      // .then((answer) => {
      //   let employee = answer.employee_id;
      //   let newRole = answer.title;
      //   let query = `UPDATE employees SET role_id = ${newRole} WHERE employees.employee_id = ${employee}`;
      //   connection.query(query, answer, (err, res) => {
      //     if (err) throw err;
      //     console.log("working");
      //     promptChoices();
      //   });
      })
  );
};
