const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

async function displayMainPrompts() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  await askUser(); // askUser that returns a Promise
}

displayMainPrompts();

//Prompts to as User
const askUser = () =>
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "View All Departments", value: "VIEW_DEPARTMENTS" },
        { name: "View All Roles", value: "VIEW_ROLES" },
        { name: "View All Employees", value: "VIEW_EMPLOYEES" },
        { name: "Add Department", value: "ADD_DEPARTMENT" },
        { name: "Add Role", value: "ADD_ROLE" },
        { name: "Add Employee", value: "ADD_EMPLOYEE" },
        { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        { name: "Remove Employee", value: "REMOVE_EMPLOYEE" },
        { name: "Update Employee Manager", value: "UPDATE_EMPLOYEE_MANAGER" },
        { name: "Remove Role", value: "REMOVE_ROLE" },
        { name: "Remove Department", value: "REMOVE_DEPARTMENT" },
        {
          name: "Display Spent Budget By Department",
          value: "DISPLAY_SPENT_BUDGET_BY_DEPARTMENT",
        },
        { name: "Exit", value: "EXIT" },
      ],
    },
  ])


async function handleUserChoice() {
  const res = await getUserChoice(); //  returns a Promise resolving to an object with a property "choice"
  const choice = res.choice;
  
  const actions = {
    "VIEW_DEPARTMENTS": displaydepts,
    "VIEW_ROLES": displayRoles,
    "VIEW_EMPLOYEES": viewEmployees,
    "ADD_DEPARTMENT": addDept,
    "ADD_ROLE": insertRole,
    "ADD_EMPLOYEE": addEmployee,
    "UPDATE_EMPLOYEE_ROLE": modifyEmpRole,
    "VIEW_EMPLOYEES_BY_DEPARTMENT": displayEmpByDept,
    "VIEW_EMPLOYEES_BY_MANAGER": displayEmpByMngr,
    "REMOVE_EMPLOYEE": deleteEmployee,
    "UPDATE_EMPLOYEE_MANAGER": modifyEmpMngr,
    "REMOVE_ROLE": deleteRole,
    "REMOVE_DEPARTMENT": deleteDept,
    "DISPLAY_SPENT_BUDGET_BY_DEPARTMENT": displaySpentBudgetByDept,
    "exit": exit,
  }
  
  const action = actions[choice];
  if (action) {
    await action();
  } else {
    console.log("Invalid choice, please try again.");
    await handleUserChoice(); // call the function until a valid choice is made
  }
}

handleUserChoice();

async function displayEmp() {
  const [rows] = await db.fetchEmployees();
  const employees = rows;
  console.log("\n");
  console.table(employees);
}

async function viewEmployees() {
await displayEmp();
await askUser();
}

async function displayEmpByDept() {
  const [rows] = await db.fetchDepts();
  const depts = rows;
  const deptOptions = depts.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId",
    message: "Choose a department to see its employees:",
    choices: deptOptions,
  });
  const [employees] = await db.fetchEmpByDept(departmentId);
  console.log("\n");
  console.table(employees);
}

async function displayEmpByDept() {
  await displayEmpByDept();
  await askUser();
}

//Display all employees that have a specified manager as their direct supervisor.
async function displayEmpByMngr() {
  const [rows] = await db.fetchEmployees()
  let mgrs = rows
  const mgrOptions = mgrs.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }))

  const { MgrId } = await prompt([
    {
      type: "list",
      name: "MgrId",
      message: "Select an employee to view their direct reports:",
      choices: mgrOptions,
    },
  ])

  const [employees] = await db.fetchEmpByMngr(MgrId)
  console.log("\n")
  if (employees.length === 0) {
    console.log("The selected employee has no direct reports")
  } else {
    console.table(employees)
  }
  await askUser();
}

//Delete an employee
async function deleteEmployee() {
  const [rows] = await db.fetchEmployees()
  let employees = rows
  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }))

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select employee you would like to delete",
      choices: employeeOptions,
    },
  ])

  await db.deleteEmployee(employeeId)
  console.log("Removed selected employee from the database")
  await askUser()
}

// Update an employee's role
async function modifyEmpRole() {
  const [empRows] = await db.fetchEmployees()
  let employees = empRows
  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }))

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the Employee's role you want to modify:",
      choices: employeeOptions,
    },
  ])

  const [roleRows] = await db.fetchRoles()
  let roles = roleRows
  const roleOptions = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }))

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Choose the role to assign to the selected employee",
      choices: roleOptions,
    },
  ])

  await db.modifyEmpRole(employeeId, roleId)
  console.log("Modified employee's role")
  await askUser();
}




// Update an employee's manager
async function modifyEmpMngr() {
  const [empRows] = await db.fetchEmployees();
  let employees = empRows;
  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee's manager you want to modify?",
      choices: employeeOptions,
    },
  ]);

  const [mgrRows] = await db.fetchPotentialmgrs(employeeId);
  let mgrs = mgrRows;
  const mgrOptions = mgrs.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { MgrId } = await prompt([
    {
      type: "list",
      name: "MgrId",
      message:
        "Select the employee to assign as the manager for the chosen employee:",
      choices: mgrOptions,
    },
  ]);

  await db.modifyEmpMgr(employeeId, MgrId);
  console.log("Modified employee's manager");
  await askUser();
}

// View all roles
async function displayRoles() {
  const [rows] = await db.fetchRoles();
  let roles = rows;
  console.log("\n");
  console.table(roles);
  await askUser();
}

// Add a role
async function insertRole() {
  const [rows] = await db.fetchdepts();
  let depts = rows;
  const departmentOptions = depts.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the title of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentOptions
    }
  ]);

  await db.generateRole(role);
  console.log(`Added ${role.title} to the database`);
  await askUser();
}

// Delete a role
async function deleteRole() {
  const [rows] = await db.fetchRoles();
  let roles = rows;
  const roleOptions = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role would you like to delete? (Caution: This will also eliminate associated employees.)",
      choices: roleOptions
    }
  ]);

  await db.deleteRole(roleId);
  console.log("Deleted role from the database");
  await askUser();
}

// View all departments
async function displaydepts() {
  const [rows] = await db.fetchdepts();
  let depts = rows;
  console.log("\n");
  console.table(depts);
  await askUser();
}

// Add a department
async function addDept() {
  const name = await prompt([
    {
      name: "name",
      message: "What is the department name?"
    }
  ]);

  await db.generateDept(name);
  console.log(`Added ${name.name} to the database`);
  await askUser();
}

// Delete a department
async function deleteDept() {
  const [rows] = await db.fetchdepts();
  let depts = rows;
  const departmentOptions = depts.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Select which department you wish to delete? (Caution: This action will also eliminate related roles and employees.)",
    choices: departmentOptions
  });

  await db.deleteDept(departmentId);
  console.log(`Delete department from the database`);
  await askUser();
}

// View all depts and show their total utilized department budget
async function displaySpentBudgetByDept() {
  const [rows] = await db.displayDeptBudgets();
  let depts = rows;
  console.log("\n");
  console.table(depts);
  await askUser();
}

// Add an employee
async function addEmployee() {
  const res = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const firstName = res.first_name;
  const lastName = res.last_name;

  const [roleRows] = await db.fetchRoles();
  const roleOptions = roleRows.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const roleIdRes = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the role of the Employee?",
    choices: roleOptions
  });

  const roleId = roleIdRes.roleId;

  const [empRows] = await db.fetchEmployees();
  const mgrOptions = empRows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  mgrOptions.unshift({ name: "None", value: null });

  const mgrIdRes = await prompt({
    type: "list",
    name: "MgrId",
    message: "Who is the manager of the Employee?",
    choices: mgrOptions
  });

  const employee = {
    manager_id: mgrIdRes.MgrId,
    role_id: roleId,
    first_name: firstName,
    last_name: lastName
  };

  await db.generateEmp(employee);
  console.log(`Added ${firstName} ${lastName} to the database`);
  await askUser();
}


// Exit the application
function exit() {
  console.log("Exit");
  process.exit();
}



