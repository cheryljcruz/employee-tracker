const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rootof1allevil3.",
  database: "employee_db",
});

//export mod
module.exports = db;
