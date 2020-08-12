const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

//Connects to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "F1gur30ut@bl3",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startApp();
});

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

function addDepartment() {
    startApp();
}

function addRole() {
    startApp();
}