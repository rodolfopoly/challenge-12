const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // {TODO: Add your MySQL password}
        password: 'rootmysql',
        database: 'employees_db'
    });

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employees_db database.`);
    start();
})

function start() {
    inquirer.prompt({
        type: 'list',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'
        ],
        message: 'choice one of the following option',
        name: 'start'
    }).then(answer => {
        console.log('you want to ' + answer.start);
        switch (answer.start) {
            case 'view all departments':
                viewAllDepartments();
                break;
            case 'view all roles':
                viewAllRoles();
                break;
            case 'view all employees':
                viewAllEmployees();
                break;
            case 'add a department':
                addADepartment();
                break;
            case 'add a role':
                addARole();
                break;
            case 'add a employee':
                addAEmployee();
                break;
            case 'update an employee role':
                updateAnEmployeeRole();
                break;
            default:
                break;
        }
    });
}

function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    let query = 'Select * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    let query = 'Select * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addADepartment() {
    let query = 'INSERT INTO department(name) VALUES (?)'

    inquirer.prompt({
        type: 'input',
        message: 'Enter the name of the department',
        name: 'departmentName'
    }).then(answer => {
        connection.query(query, [answer.departmentName], function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

function addARole() {
    let query = 'INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)'

    inquirer.prompt([{
        type: 'input',
        message: 'enter the name',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'enter the salary',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'enter the department',
        name: 'department'
    },
    ]).then(answer => {
        const { roleName, salary, department } = answer;
        connection.query(query, [roleName, salary, department], function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

function addAEmployee() {
    let query = 'INSERT INTO employee(first_name, last_name , role_id, manager_id) VALUES (?, ?, ?, ?)';

    inquirer.prompt([{
        type: 'input',
        message: 'enter the first name',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'enter the last name',
        name: 'lastName'
    },
    {
        type: 'input',
        message: 'enter the role id',
        name: 'role'
    },
    {
        type: 'input',
        message: 'enter the manager id',
        name: 'manager'
    },
    ]).then(answer => {
        const { firstName, lastName, role, manager } = answer;
        connection.query(query, [firstName, lastName, role, manager], function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

function updateAnEmployeeRole() {
    let query = 'UPDATE employee SET role_id=? WHERE first_name= ?';

    inquirer.prompt([{
        type: 'input',
        message: 'enter the employee first name',
        name: 'name'
    },
    {
        type:'input',
        message:'enter the new role',
        name:'role'
    }
    ]).then(answer =>{
        const {name, role} = answer;
        connection.query(query, [role, name], function(err, res){
            if(err) throw err;
            console.table(answer);
            start();
        })
    })
}
