// Importing the mysql2 library
const mysql = require("mysql2")

// Creating a new connection to the MySQL database
const connection = mysql
  .createConnection({
    host: "localhost",
    // username to connect with
    user: "root",
    // password to connect with
    password: "",
    // name of database to use
    database: "employees",
  })
  .promise() // Upgrade the connection to use Promises to be able to use async/await with the connection to perform asynchronous queries.

// Exporting connection to use in other modules
module.exports = connection;
