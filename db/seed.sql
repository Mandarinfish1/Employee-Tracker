-- Creating a department table and insert values
INSERT INTO department
    (name)
VALUES
    ('Sales'), ('Engineering'), ('Finance'), ('Legal');

-- Creating a role table and insert values, referencing department IDs
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Account Manager', 160000, 3), ('Accountant', 125000, 3), 
    ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4);

-- Creating an employee table and insert values, referencing role IDs and manager IDs
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Sarah', 'Johnson', 1, NULL), ('David', 'Chen', 2, 1), ('Emily', 'Jackson', 3, NULL), 
    ('Michael', 'Lee', 4, 3), ('Olivia', 'Rodriquez', 5, NULL), ('Benjamin', 'Kim', 6, 5), 
    ('Ava', 'Williams', 7, NULL), ('Daniel', 'Park', 8, 7);
