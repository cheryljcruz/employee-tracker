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
  return inquirer.prompt([
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
  ]);
  // parse selection
};

// return to selection

// view employee
getEmployee = (data) => {
  const sql = `SELECT * FROM employee;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);
    //return to prompt
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
  })
}
