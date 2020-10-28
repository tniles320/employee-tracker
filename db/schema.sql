CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT(10) NOT NULL,
manager_id INT(10),
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT(10) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE department (
id INT(10) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);