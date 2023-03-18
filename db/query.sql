SELECT * 
FROM department
INNER JOIN roles
ON department.id  = roles.department_id;

SELECT title, salary, department_id
FROM roles 
INNER JOIN employee
ON roles.id = employee.id;
