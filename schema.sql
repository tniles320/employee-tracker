-- DROP DATABASE employee_tracker_db --

-- CREATE DATABASE employee_tracker_db; --

USE employee_tracker_db;

/*
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES
		("Gary", "Clark Jr", 3, null),
        ("Valen", "Dreth", 5, null),
		("Taylor", "Niles", 4, 1),
        ("Tony", "Royster Jr", 1, null),
        ("Nick", "Troup", 2, 4),
        ("Brandon", "Sankey", 6, 2),
        ("Tiffany", "Tang", 2, 4),
        ("Susan", "Turner", 7, null),
        ("Tony", "Stark", 6, 2),
        ("April", "May", 4, 1);
        
INSERT INTO role (title, salary, department_id)
	VALUES
		("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Engineering Lead", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3),
        ("Accountant", 125000, 4);

INSERT INTO department (name)
	VALUES
		("Sales"),
        ("Engineering"),
        ("Legal"),
        ("Finance");
*/