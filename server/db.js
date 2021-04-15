const Pool = require("pg");

const pool = Pool({
    user: "postgres",
    password: "posgres",
    host: "localhost",
    port: 5432,
    database: "todo_database"
});

module.exports = pool;