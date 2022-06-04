const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

class Employees {
    constructor(fist_name, last_name, role, manager){
        this.first_name = fist_name;
        this.last_name = last_name;
        this.role = role;
        this.manager = manager;
    }

    addEmployees(){
        connection.query(`INSERT INTO employees( first_name, last_name, role_id, manager_id) 
        VALUES('${this.first_name}', '${this.last_name}', '${this.role}', '${this.manager}')`)
    }

    viewAllEmployees(){
        
    }
module.exports = Employees