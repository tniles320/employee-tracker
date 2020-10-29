const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { restoreDefaultPrompts } = require("inquirer");

const mysqlQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, salary, employee.manager_id AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id"

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tt032091!",
    database: "employee_tracker_db"
});

const restartPrompt = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "restartChoice",
      message: "Would you like to do anything else?",
      choices: ["Yes", "No"]
    }
  ]).then((res) => {
    if(res.restartChoice === "Yes") {
      questionPrompt();
    } else {
      connection.end();
      return;
    }
  })
}

const viewAllEmployees = () => {
    connection.query(mysqlQuery, (err, res) => {
        if(err) throw err;
        console.table(res);
        restartPrompt();
    })
}

const viewEmployeesDepartment = () => {
  const departmentArray = [];
  connection.query("SELECT name FROM department", (err, res) => {
    if(err) throw err;
    for(let i = 0; i < res.length; i++) {
      departmentArray.push(res[i].name)
    }
    inquirer.prompt([
      {
        type: "list",
        name: "departmentChoice",
        message: "Which department would you like to search from?",
        choices: departmentArray
      }
    ]).then((result) => {
      connection.query(`${mysqlQuery} WHERE department.name = ?`, [result.departmentChoice], (err, departmentRes) => {
        if(err) throw err;
        console.table(departmentRes)
        restartPrompt();
      })
    })
  })
}

const viewEmployeesManager = () => {
  const managerArray = [];
  connection.query('SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE role_id = 1 OR role_id = 3 OR role_id = 5;', (err, res) => {
    if(err) throw err;
    for(let i = 0; i < res.length; i++) {
      managerArray.push(res[i].manager)
    }
    inquirer.prompt([
      {
        type: "list",
        name: "managerChoice",
        message: "Which manager would you like to search from?",
        choices: managerArray
      }
    ]).then((result) => {
      connection.query(`${mysqlQuery} WHERE employee.manager_id = ?`, [result.managerChoice], (err, managerRes) => {
        if(err) throw err;
        console.table(managerRes)
        restartPrompt();
      })
    })
  })
}

connection.connect(function (err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
});

const questionPrompt = () => {
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
              viewAllEmployees();
            break;
          case "View employees by department":
              viewEmployeesDepartment();
            break;
          case "View employees by manager":
              viewEmployeesManager();
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
          };
  });
};

questionPrompt();