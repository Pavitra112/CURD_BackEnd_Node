const mysql = require("mysql")
const connection = mysql.createConnection({ host: process.env.HOST, database: "firstProject", user: "root" })

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;