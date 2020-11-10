// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql"),;

// const to connect to database
const dbCon = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "*Itzael2019*",
    database: "employtrac_db",
    multipleStatements: true
});
// Connecting to database
dbCon.connect((err)=>{
    if(err) {
        throw err;
    }
    console.log(connected);
    start();
});
let userOptions = [
    "Add department",
    "Add role",
    "Add employee",
    "View departments",
    "View roles",
    "View employees",
    "View employees by manager",
    "View departments utilized budget",
    "Update roles",
    "Update employee manager",
    "Remove department",
    "Remove role",
    "Remove employee",
    "done"
];
let roleQuestions = [
{
    name: "role_title",
    type: "input",
    message: "Enter role",
},
{
    name: "role_salary",
    type: "input",
    message: "Enter role salary",
},
];
let employeeQuestions = [
    {
    name: "first_name",
    type: "input",
    message: "Enter employee first name",
    },
    {
    name: "last_name",
    type: "input",
    message: "Enter employee last name",
          },
        ];
var con = mysql.createConnection({
          host: "localhost",
          port: 3306,
          user: "root",
          password: "*Itzael2019*",
          database: "employtrac_db",
          multipleStatements: true
});
function start(){
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "what would you like to do?",
            choices: userOptions,
        })
        .then((answer)=>{
            if(answer.action == "Add department"){
                addDepartment();
            }
        })
}
        
    

