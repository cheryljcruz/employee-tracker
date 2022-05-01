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
          message: "Hello, please select an option!",
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
        } else if (data.start === "Add a Department") {
          addDept();
        } else if (data.start === "Add a Role") {
          addRole();
        } else if (data.start === "Add an Employee") {
          addEmployee();
        } else if (data.start === "Update Employee role") {
          updateRole();
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
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    //return to prompt
    returnPrompt();
  });
};

// view role
getRole = (data) => {
  const sql = `SELECT * FROM role;`;
  db.query(sql, (err, res) => {
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
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);

    // return to prompt
    returnPrompt();
  });
};

// add department
addDept = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department?",
      },
    ])
    .then((deptData) => {
      const sql = `INSERT INTO department (name)
    VALUES (?);`;
      const params = deptData.deptName;
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(`${deptData.deptName} has been added.`);
        returnPrompt();
      });
    });
};
// add role
addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the title of this role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is the associated department id for this role?",
      },
    ])
    .then((roleData) => {
      const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
      const params = [roleData.roleName, roleData.salary, roleData.deptId];
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(`${roleData.roleName} has been added.`);
        returnPrompt();
      });
    });
};
// add employee
addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role id?",
      },
      {
        type: "confirm",
        name: "managerConfirm",
        message: "Does this employee have a reporting manager?",
        default: false,
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager id?",
        when: ({ managerConfirm }) => managerConfirm,
      },
    ])
    .then((employeeData) => {
      if (employeeData.managerConfirm === true) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`;
        const params = [
          employeeData.first,
          employeeData.last,
          employeeData.roleId,
          employeeData.managerId,
        ];
        db.query(sql, params, (err, res) => {
          if (err) {
            console.log(err);
          }
          console.log(
            `${(employeeData.first, employeeData.last)} has been added`
          );

          returnPrompt();
        });
      }
      const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?, ?, ?);`;
      const params = [
        employeeData.first,
        employeeData.last,
        employeeData.roleId,
      ];
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(
          `${(employeeData.first, employeeData.last)} has been added.`
        );

        returnPrompt();
      });
    });
};
// update role
updateRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "updateId",
        message: "Insert employee id to update",
      },
      {
        type: "input",
        name: "idRole",
        message: "Insert the role id to update",
      },
    ])
    .then((employeeUpdate) => {
      const sql = `UPDATE employee SET role_id = ?
    WHERE id = ?;`;
      const params = [employeeUpdate.idRole, employeeUpdate.updateId];
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log("Information updated");

        returnPrompt();
      });
    });
};
// connect to db
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");

  // start prompt call
  startPrompt();
});
