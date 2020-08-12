DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

use employees_db;

CREATE TABLE department(
    id INT auto_increment NOT NULL,
    name VARCHAR(30) not NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT auto_increment NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT auto_increment NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);