const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  fetchEmployees() {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    return this.connection.promise().query(sql)
  }

  // Find all employees except the given employee id
  fetchPotentialmgrs(employeeId) {
    const sql = "SELECT id, first_name, last_name FROM employee WHERE id != ?;"
    return this.connection.promise().query(sql, employeeId)
  }

  // Create a new employee
  generateEmp(employee) {
    const sql = "INSERT INTO employee SET ?;"
    return this.connection.promise().query(sql, employee)
  }

  // Remove an employee with the given id
  deleteEmployee(employeeId) {
    const sql = "DELETE FROM employee WHERE id = ?;"
    return this.connection.promise().query(sql, employeeId)
  }

  // Update the given employee's role
  modifyEmpRole(employeeId, roleId) {
    const sql = "UPDATE employee SET role_id = ? WHERE id = ?;"
    return this.connection.promise().query(sql, [roleId, employeeId])
  }

  // Update the given employee's manager
  modifyEmpMgr(employeeId, managerId) {
    const sql = "UPDATE employee SET manager_id = ? WHERE id = ?;"
    return this.connection.promise().query(sql, [managerId, employeeId])
  }

  // Find all roles, join with departments to display the department name
  fetchRoles() {
    const sql =
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    return this.connection.promise().query(sql)
  }

  // Create a new role
  generateRole(role) {
    const sql = "INSERT INTO role SET ?;"
    return this.connection.promise().query(sql, role)
  }

  // Remove a role from the db
  deleteRole(roleId) {
    const sql = "DELETE FROM role WHERE id = ?;"
    return this.connection.promise().query(sql, roleId)
  }

  // Find all departments
  fetchDepts() {
    const sql = "SELECT department.id, department.name FROM department;"
    return this.connection.promise().query(sql)
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  displayDeptBudgets() {
    const sql =
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    return this.connection.promise().query(sql)
  }

  // Create a new department
  generateDept(department) {
    const sql = "INSERT INTO department SET ?;"
    return this.connection.promise().query(sql, department)
  }

  // Remove a department
  deleteDept(departmentId) {
    const sql = "DELETE FROM department WHERE id = ?;"
    return this.connection.promise().query(sql, departmentId)
  }

  // Find all employees in a given department, join with roles to display role titles
  fetchEmpByDept(departmentId) {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;"
    return this.connection.promise().query(sql, departmentId)
  }

  //Find all employees by manager, join with roles and department, and job titles, for the employees  
  fetchEmpByMgr(managerId) {
    const sql =
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;"
    return this.connection.promise().query(sql, managerId)
  }
}
module.exports = new DB(connection);