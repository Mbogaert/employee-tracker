DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (                                                                   
 id INTEGER NOT NULL AUTO_INCREMENT,    
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 departments_id INT NOT NULL,
 FOREIGN KEY (departments_id) REFERENCES departments(id),
 PRIMARY KEY (id)
 );

 CREATE TABLE employees (
     id INTEGER NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     FOREIGN KEY (role_id) REFERENCES roles(id),
     manager_id INT,
     FOREIGN KEY (manager_id) REFERENCES employees(id),
     PRIMARY KEY (id)
 );