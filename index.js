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
    connection.query("SELECT * FROM employee", (err, res) => {
        if(err) throw err;
        console.table(res)
    })
}

// const selectAllEmployees = () => {
//     connection.query("SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id", (err, res) => {
//         if(err) throw err;
//         console.table(res);
//         console.log(res);
//     })
// }

connection.connect(function (err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    selectAllEmployees();
    connection.end();
});