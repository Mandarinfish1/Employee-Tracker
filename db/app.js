const { prompt } = require("inquirer")
const db = require("./db")
require("console.table")

init()

// Load main prompts
function init() {
  console.log("Welcome to Employee Manager")
  loadMainPrompts()
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees()
        break
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment()
        break
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager()
        break
      case "ADD_EMPLOYEE":
        addEmployee()
        break
      case "REMOVE_EMPLOYEE":
        removeEmployee()
        break
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole()
        break
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager()
        break
      case "VIEW_DEPARTMENTS":
        viewDepartments()
        break
      case "ADD_DEPARTMENT":
        addDepartment()
        break
      case "REMOVE_DEPARTMENT":
        removeDepartment()
        break
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment()
        break
      case "VIEW_ROLES":
        viewRoles()
        break
      case "ADD_ROLE":
        addRole()
        break
      case "REMOVE_ROLE":
        removeRole()
        break
      default:
        quit()
    }
  })
}

// ... ( functions)

// Exit the application
function quit() {
  console.log("Goodbye!")
  process.exit()
}
