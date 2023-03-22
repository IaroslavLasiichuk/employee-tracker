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
        case 'View all departments':
            viewDepartments();
            break;

        case 'View all roles':
            viewRoles();
            break;

        case 'View all employees':
            viewEmployees();
            break;

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
// View all of the departments.
const viewDepartments = () => {
    let sql = `SELECT * FROM department`;
    db.query(sql, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        init();
    });
}
// View all roles
const viewRoles = () => {
    let sql = `SELECT roles.id, roles.title, roles.salary, department.department_name
    FROM roles
    JOIN department ON roles.department_id = department.id
    ORDER BY roles.id ASC`;
    db.query(sql, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        init();
    });
}
// View all employees
const viewEmployees = () => {
    let sql = `SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.department_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    JOIN roles r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY e.id ASC`;
    db.query(sql, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        init();
    });
}

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        })
        .then(answer => {
            let sql = `INSERT INTO department (department_name) VALUES ('${answer.name}')`;
            db.query(sql, function (err, rows) {
                if (err) throw err;
                init();
            });
        })
}

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role you would like to add?'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'What is the salary of the role you would like to add?'
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'What is the department name for the role you would like to add?',
                choices: [
                    {
                        name: 'Sales',
                        value: 1,
                    },
                    {
                        name: 'Engineering',
                        value: 2,
                    },
                    {
                        name: 'Legal',
                        value: 3,
                    },
                    {
                        name: 'Finance',
                        value: 4,
                    },
                 ]
            }
        ])
        .then(answer => {
            let sql = `INSERT INTO roles(title, salary, department_id) 
           VALUES ('${answer.title}', '${answer.salary}', '${answer.department_id}')`;
            db.query(sql, function (err, rows) {
                if (err) throw err;
                init();
            });
        })
}

//   Add employee
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter first name',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter last name',
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'What is role title?',
                choices: [
                    {
                        name: 'Sales Lead',
                        value: 1,
                    },
                    {
                        name: 'Lead Engineer',
                        value: 2,
                    },

                    {
                        name: 'Software Engineer',
                        value: 3,
                    },
                    {
                        name: 'Accountant',
                        value: 4,
                    },
                    {
                        name: 'Lawyer',
                        value: 5,
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 6,
                    },
                    {
                        name: 'Selesperson',
                        value: 7,
                    },
                    {
                        name: 'Account Manager',
                        value: 8,
                    },
                ]
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'What is manager name?',
                choices: [
                    {
                        name: 'John Doe',
                        value: 1, 
                    },
                    {
                        name: 'Mike Chan',
                        value: 2, 
                    },
                    {
                        name: 'Iaroslav Lasiichuk',
                        value: 3, 
                    },
                    {
                        name: 'Ashley Rodriguez',
                        value: 4, 
                    },
                    {
                        name: 'Kevin Tupic',
                        value: 5, 
                    },
                    {
                        name: 'Kunal Singh',
                        value: 6, 
                    },
                    {
                        name: 'Makia Brown',
                        value: 7, 
                    },
                    {
                        name: 'Sarah Lourd',
                        value: 8, 
                    }
                ]
            },

        ])
        .then(answer => {
            let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
           VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role_id}', '${answer.manager_id}')`;

            db.query(sql, function (err, rows) {
                if (err) throw err;
                init();
            });
        })
}
init();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} at http://localhost${PORT}`);
})
