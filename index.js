// inquirer
const inquirer = require("inquirer");
// db import
const db = require("./db/connection");
// console.table
const cTable = require("console.table");

// prompt to view all departments, roles, employees
// prompt to add department, role, employee and update role

// start prompt
const startPrompt = () => {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "start",
          message: "Hello! Please select an option!",
          choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee role",
            "Exit",
          ],
        },
      ])
      // parse selection
      .then((data) => {
        if (data.start === "View all Departments") {
          getDepartment();
        } else if (data.start === "View all Roles") {
          getRole();
        } else if (data.start === "View all Employees") {
          getEmployee();
        }
      })
  );
};

// return to selection
const returnPrompt = () => {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmReturn",
        message: "Would you like to select another option?",
        default: false,
      },
    ])
    .then((returnData) => {
      if (returnData.confirmReturn) {
        startPrompt();
      }
      console.log("Goodbye!");
      return;
    });
};

// view employee
getEmployee = (data) => {
  const sql = `SELECT * FROM employee;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);
    //return to prompt
    returnPrompt();
  });
};

// view role
getRole = (data) => {
  const sql = `SELECT * FROM role;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);

    // return to prompt
    returnPrompt();
  });
};

// view department
getDepartment = (data) => {
  const sql = `SELECT * FROM department;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);

    // return to prompt
    returnPrompt();
  });
};

// connect to db
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");

  // start prompt call
  startPrompt();
});
