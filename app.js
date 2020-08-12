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
            console.table(role);
        });
        startApp();
    });
}

function addEmployee() {
    startApp();
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, departments) {
        console.table(departments);
        startApp();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, roles) {
        console.table(roles);
        startApp();
    })
}

function viewEmployees() {
    startApp();
}

function updateRole() {
    startApp();
}