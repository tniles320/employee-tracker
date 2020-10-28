const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tt032091!",
    database: "employee_tracker_db"
});

const selectAllEmployees = () => {
    connection.query("SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee, role.title, department.name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role ON e.role_id = role.id INNER JOIN department on role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id", (err, res) => {
        if(err) throw err;
        console.table(res);
        connection.end();
    })
}

connection.connect(function (err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
});

inquirer.prompt([
    {
        type: "list",
        name: "choicePrompt",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update employee manager",
            "View roles",
            "Add role",
            "Remove role",
            "View departments",
            "Add department",
            "Remove department"
        ]
    }
]).then((res) => {
    switch (res.choicePrompt) {
        case "View all employees":
            selectAllEmployees();
          break;
        case "View employees by department":
            //;
          break;
        case "View employees by manager":
            //;
          break;
        case "Add employee":
            //;
          break;
        case "Remove employee":
            //;
          break;
        case "Update employee role":
            //;
          break;
        case "Update employee manager":
            //;
          break;
        case "View roles":
            //;
          break;
        case "Remove role":
            //;
          break;
        case "View departments":
            //;
          break;
        case "Add department":
            //;
          break;
        case "Remove department":
            //;
          break;
        default:
          return;
        }
})