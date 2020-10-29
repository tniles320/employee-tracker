USE employee_tracker_db;

INSERT INTO department (name)
	VALUES
		("Sales"),
        ("Engineering"),
        ("Legal"),
        ("Finance");
        
INSERT INTO role (title, salary, department_id)
	VALUES
		("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Engineering Lead", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3),
        ("Accountant", 125000, 4);

        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES 
		("Tony", "Royster Jr", 1, null),
        ("Nick", "Troup", 2, 1),
		("Tiffany", "Tang", 2, 1),
		("Gary", "Clark Jr", 3, null),
        ("Taylor", "Niles", 4, 4),
        ("April", "May", 4, 4),
        ("Valen", "Dreth", 5, null),
        ("Brandon", "Sankey", 6, 7),
        ("Tony", "Stark", 6, 7),
        ("Susan", "Turner", 7, null);
/*
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, salary, employee.manager_id AS manager
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
*/