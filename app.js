const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { start } = require("repl");

//Connects to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "F1gur30ut@bl3",
    database: "employees_db"
});

//Connects and starts Inquirer app
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startApp();
});

//Begins App with list of first options
function startApp() {
    console.log("Welcome to the Employee Tracker Database!");
    inquirer.prompt({
        type: "list",
        name: "option",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View all departments",
            "View all roles",
            "View all employees",
            "Update an employee's role",
            "EXIT"
        ]
    }).then(answer => {
        switch (answer.option) {
            case "Add a department": 
                addDepartment()
                break;

            case "Add a role":
                addRole()
                break;

            case "Add an employee":
                addEmployee()
                break;

            case "View all departments":
                viewDepartments()
                break;

            case "View all roles":
                viewRoles()
                break;

            case "View all employees":
                viewEmployees()
                break;

            case "Update an employee's role":
                updateRole()
                break;

            default:
                connection.end()
                break;
        }
    });
}

//Adds a department to the database
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "What is the department you'd like to add?"
    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.department], function(err, department) {
            if (err) throw err;
            console.table("The department has been added");
            startApp();
        });
    });
}

//Adds a role to the database
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What role would you like to add?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "number",
            name: "id",
            message: "What is the department ID for this role?"
        }
    ]). then(answers => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.title, answers.salary, answers.id], function (err, role) {
            console.table("The role has been added!");
        });
        startApp();
    });
}

//Adds an employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "what is the employee's last name?"
        },
        {
            name: "roleId",
            type: "number",
            message: "What is the employee's Role ID?"
        },
        {
            name: "managerId",
            type: "number",
            message: "What is the employee's Manager ID?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.roleId, answers.managerId], function(err, employee) {
            if (err) throw err;
            console.table("The employee has been added!");
            startApp();
        });
    });
}

//Shows a list of departments in the database
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, departments) {
        console.table(departments);
        startApp();
    })
}

//Shows a list of roles in the database
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, roles) {
        console.table(roles);
        startApp();
    })
}

//Shows a list of employees in the database
function viewEmployees() {
    connection.query("SELECT * FROM employee" , function (err, employees) {
        console.table(employees);
        startApp();
    });
}

//Updates an employee's role
function updateRole() {
    inquirer.prompt([
        {
            type: "number",
            name: "employeeId",
            message: "Please enter the employee ID of the role you'd like to update."
        },
        {
            type: "number",
            name: "roleId",
            message: "Please enter the new Role ID."
        }
    ]).then(answers => {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.roleId, answers.employeeId], function(err, newRole) {
            console.table("The role has been updated!");
            startApp();
        });
    });
}