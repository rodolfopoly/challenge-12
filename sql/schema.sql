DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    tite VARCHAR(45) NULL,
    salary DECIMAL NULL,
    department_id INTEGER NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL,
    role_id INTEGER NULL,
    manager_id INTEGER NULL,
    PRIMARY KEY (id)
);