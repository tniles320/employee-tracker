USE employee_tracker_db;

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

SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee, role.title, department.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee e
INNER JOIN role ON e.role_id = role.id
INNER JOIN department on role.department_id = department.id
LEFT JOIN employee m ON m.id = e.manager_id