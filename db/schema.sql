-- Drop the database if it exists to avoid any conflicts
DROP SCHEMA IF EXISTS employees;

-- Create a new database named employees
CREATE SCHEMA employees;

-- Switch to the newly created database
USE employees;

-- Create a table named department
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) NOT NULL, 
  UNIQUE KEY (name) 
);

-- Create a table named role
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL(10, 2) UNSIGNED NOT NULL, -- salary for the role, cannot be NULL, with up to 10 digits and 2 decimal places
  department_id INT UNSIGNED NOT NULL, 
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE 
);

-- Create a table named employee
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL, 
  role_id INT UNSIGNED NOT NULL, 
  INDEX role_ind (role_id), 
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, -- create a foreign key constraint to ensure the role_id exists in the role table
  manager_id INT UNSIGNED, 
  INDEX man_ind (manager_id), 
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL -- create a foreign key constraint to ensure the manager_id exists in the employee table
);
