const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

async function displayLogoAndLoadPrompts() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  await promptUser(); // Assuming there's a function promptUser that returns a Promise
}

displayLogoAndLoadPrompts();


const promptUser = () => prompt([
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      { name: "View All Employees", value: "VIEW_EMPLOYEES" },
      { name: "View All Employees By Department", value: "VIEW_EMPLOYEES_BY_DEPARTMENT" },
      { name: "View All Employees By Manager", value: "VIEW_EMPLOYEES_BY_MANAGER" },
      { name: "Add Employee", value: "ADD_EMPLOYEE" },
      { name: "Remove Employee", value: "REMOVE_EMPLOYEE" },
      { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
      { name: "Update Employee Manager", value: "UPDATE_EMPLOYEE_MANAGER" },
      { name: "View All Roles", value: "VIEW_ROLES" },
      { name: "Add Role", value: "ADD_ROLE" },
      { name: "Remove Role", value: "REMOVE_ROLE" },
      { name: "View All Departments", value: "VIEW_DEPARTMENTS" },
      { name: "Add Department", value: "ADD_DEPARTMENT" },
      { name: "Remove Department", value: "REMOVE_DEPARTMENT" },
      { name: "View Total Utilized Budget By Department", value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT" },
      { name: "Quit", value: "QUIT" }
    ]
  }
 ]);

async function handleUserChoice() {
  const res = await getUserChoice(); // Assuming there's a function getUserChoice that returns a Promise resolving to an object with a property "choice"
  const choice = res.choice;
  
  const actions = {
    "VIEW_EMPLOYEES": viewEmployees,
    "VIEW_EMPLOYEES_BY_DEPARTMENT": displayEmployeesByDepartment,
    "VIEW_EMPLOYEES_BY_MANAGER": viewEmployeesByManager,
    "ADD_EMPLOYEE": addEmployee,
    "REMOVE_EMPLOYEE": removeEmployee,
    "UPDATE_EMPLOYEE_ROLE": updateEmployeeRole,
    "UPDATE_EMPLOYEE_MANAGER": updateEmployeeManager,
    "VIEW_DEPARTMENTS": viewDepartments,
    "ADD_DEPARTMENT": addDepartment,
    "REMOVE_DEPARTMENT": removeDepartment,
    "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT": viewUtilizedBudgetByDepartment,
    "VIEW_ROLES": viewRoles,
    "ADD_ROLE": addRole,
    "REMOVE_ROLE": removeRole,
    "QUIT": quit
  };
  
  const action = actions[choice];
  if (action) {
    await action();
  } else {
    console.log("Invalid choice, please try again.");
    await handleUserChoice(); // Recursively call the function until a valid choice is made
  }
}

handleUserChoice();

async function displayAllEmployees() {
  const [rows] = await db.FetchAllEmployees();
  const employees = rows;
  console.log("\n");
  console.table(employees);
}

async function viewEmployees() {
  await displayAllEmployees();
  await promptUser();
}

async function displayEmployeesByDepartment() {
  const [rows] = await db.locateAllDepartments();
  const departments = rows;
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId",
    message: "Choose a department to see its employees:",
    choices: departmentChoices,
  });
  const [employees] = await db.locateEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employees);
}

async function displayEmployeesByDepartment() {
  await displayEmployeesByDepartment();
  await promptUser();
}




