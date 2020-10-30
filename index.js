const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { restoreDefaultPrompts } = require("inquirer");

const mysqlQuery = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id"

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
  connection.query('SELECT employee.id, CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE role_id = 1 OR role_id = 3 OR role_id = 5;', (err, res) => {
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
      for(let i = 0; i < res.length; i++) {
        if(result.managerChoice === res[i].manager) {
          managerID = res[i].id;
        }
      }
      connection.query(`${mysqlQuery} WHERE e.manager_id = ?`, [managerID], (err, managerRes) => {
        if(err) throw err;
        console.table(managerRes);
        restartPrompt();
      })
    })
  })
}

const addEmployee = () => {
  const roleArray = [];
  connection.query("SELECT id, title FROM role", (err, res) => {
    if(err) throw err;
    console.log(res)
    for(let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title)
    }
    inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the their last name?"
      },
      {
        type: "list",
        name: "role",
        message: "What is the their role's id number?",
        choices: roleArray
      },
      {
        type: "number",
        name: "manager",
        message: "What is the their manager's id number?"
      }
    ]).then((answers) => {
      for(let i = 0; i < res.length; i++) {
        if(answers.role === res[i].title) {
          roleID = res[i].id;
        }
      }
      connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",[answers.first_name, answers.last_name, roleID, answers.manager], (err, response) => {
        if(err) throw err;
        console.log("Employee added")
        restartPrompt();
      });
    });
  });
};

const removeEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]).then((res) => {
    inquirer.prompt([
      {
        type: "list",
        name: "correctInfo",
        message: `Is this correct? <${res.first_name} ${res.last_name}> (case sensitive)`,
        choices: ["Yes", "No"]
      }
    ]).then((answer) => {
      if(answer.correctInfo === "Yes") {
        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",[res.first_name, res.last_name], (err, response) => {
          if(err) throw err;
          console.log("Employee deleted")
          restartPrompt();
        });
      } else {
        removeEmployee();
      }
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
              addEmployee();
              break;
          case "Remove employee":
              removeEmployee();
              break;
          case "Update employee role":
              //updateEmpRole();
              break;
          case "Update employee manager":
              //updateEmpManager();
              break;
          case "View roles":
              //viewRoles();
              break;
          case "Add role":
              //addRole();
              break;
          case "Remove role":
              //removeRole();
              break;
          case "View departments":
              //viewDepartment();
              break;
          case "Add department":
              //addDepartment();
              break;
          case "Remove department":
              //removeDepartment;
              break;
          default:
              return;
          };
  });
};

questionPrompt();