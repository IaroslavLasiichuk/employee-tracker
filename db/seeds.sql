INSERT INTO department (department_name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Lead Engineer', 150000, 1),
('Selesperson', 80000, 3),
('Software Engineer', 120000, 4),
('Account Manager', 160000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 1),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('John', 'Doe', 1),
('Mike', 'Chan', 2),
('Iaroslav', 'Lasiichuk', 3),
('Ashley', 'Rodriguez', 4),
('Kevin', 'Tupic', 5),
('Kunal', 'Singh', 6),
('Makia', 'Brown', 7),
('Sarah', 'Lourd', 8),
('Tom', 'Allen', 9);