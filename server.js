// Node moduls
const { urlencoded, json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cTable = require('console.table');
const dotenv = require('dotenv');
const data = require('./data');
const inquirer = require('inquirer');
dotenv.config();
//  Port number for Heroku
const PORT = process.env.PORT || 8000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
)

// Initialize app
const init = async () => {
    let answers = await inquirer.prompt(data);

    switch (answers.choice) {
        case 'View all employees':
            viewEmployees();
            break;

        case 'View all departments':
            viewDepartments();
            break;

        case 'View all roles':
            viewRoles();
            break;

        case 'View all employees':
            addEmployee();
            break

        case 'Add a department':
            addDepartment();
            break

        case 'Add a roll':
            addRole();
            break
        
        case 'Add a employee':
            addEmployee();
            break

        case 'Update Employee Role':
            updateEmployee();
            break

        case 'Exit':
            db.end();
            break;
    };
} 
// View all of the employees.
const viewEmployees = async () => {
    let sql= `SELECT * FROM employee`;
  db.query(sql, function (err, rows) {
      if (err) throw err;
        console.table(rows);
        init();
    });
}
init();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} at http://localhost${PORT}`);
})
