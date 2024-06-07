const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "student_db",
});

module.exports = mySqlPool;
