// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql"),;
const { join } = require("path");

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
    "Update role",
    "Update employee manager",
    "Remove department",
    "Remove role",
    "Remove employee",
    "Exit"
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
            }else if(answer.action == "Add role"){
                addRole();
            }else if(answer.action == "Add employee"){
                addEmployee();
            }else if(answer.action == "View departments"){
                let sql = "SELECT * FROM department;";
                dbCon.query(sql,(err,row)=>{
                    if(err)throw err;
                    console.table(row);
                    start();
                });
            }else if(answer.action == "View roles"){
                let sql = "SELECT * FROM role;";
                dbCon.query(sql,(err,row)=>{
                    if(err)throw err;
                    console.table(row);
                    start();
                });
            }else if(answer.action == "View employees"){
                let sql = "SELECT * FROM employee;";
                dbCon.query(sql,(err,row)=>{
                    if(err)throw err;
                    console.table(row);
                    start();
                });
            }else if(answer.action == "View employees by manager"){
                viewByManager();
            }else if(answer,action == "View departments utilized budget"){
                totalBudget();
            }else if(answer.action == "Update role"){
                updateRole();
            }else if(answer,action == "Update employee manager"){
                updateEmpMan();
            }else if(answer.action == "Remove department"){
                removeDepartment();
            }else if(answer.action == "Remove role"){
                removeRole();
            }else if(answer.action == "Remove employee"){
                removeEmployee();
            }else{
                answer.action == "Exit";
                process.exit();
            }
        });
}
function addDepartment(){
    inquirer
    .prompt({
        name: "department_name",
        type: "input",
        message: "What department would you like to add?",
    })
    .then((input)=>{
        if(input){
            console.log(input);
            Let sql = `INSERT INTO department (name) VALUES ("${input.department_name}");`;
            dbCon.query(sql,(err,row)=>{
                if(err)throw err;
                start();
            });
        }
    });
};
function addRole(){
    let departments = {
        name: [],
        id: [],
    };
    let sql = "SELECT * FROM department;";
    dbCon.query(sql,(err,row)=>{
        if(err)throw err;
        for(dep of row){
            departments.name.push(dep.name);
            departments.id.push(dep.id);
        }
    });
    inquirer
    .prompt(roleQuestions)
    .then((answer)=>{
        let title = answer.role_title;
        let salary = answer.role_salary;
        inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Select department",
            choices: departments.name,
        })
        .then((input)=>{
            let index = departments.name.indexOf(input.department);
            let id = departments.id[index];
            let sql = `INSERT INTO role (department_id, title, salary)
            VALUES("${id}", "${title}", "${salary}");`;

            dbCon.query(sql,(err,row)=>{
                if(err)throw err;
                console.log("Role added");
                start();
            });
        });
    });
};
function addEmployee(){
    let role = {
        id: [],
        title: [],
    };
    let sql = "SELECT * FROM role;";
    dbCon.query(sql, (err, row)=>{
        if(err)throw err;
        for(rol of row){
            roles.id.push(rol.id);
            roles.title.push(rol.title);
        }
    });
    let employees = {
        id: [],
        name: [],
    };
    let sqlSql = "SELECT * FROM employee";
    dbCon.query(sqlSql,(err,row)=>{
        if(err)throw err;
        for(emp of row){
            employees.name.push(emp.first_name + " " + emp.last_name);
            employees.id.push(emp.id);
        }
        employees.name.push("None");
        employees.id.push(0);
    });
    inquirer
    .prompt(employeeQuestions)
    .then ((answer)=>{
        let firstName = answer.first_name;
        let lastName = answer.last_name;
        inquirer
        .prompt({
        name: "role",
        type: "list",
        message: "Select role",
        choices: roles.title,
    })
    .then((input)=>{
        let index = roles.title.indexOf(input.role);
        let role_id = roles.id[index];
        inquirer
        .prompt({
            name: "manager",
            type: "list",
            message: "Select manager",
            choices: employees.name,
        })
        .then((input)=>{
            let index = employees.name.indexOf(input.manager);
            let manager_id = employees.id[index];
            let sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id)
            VALUES("${role_id}", "${firstName}", "${lastName}", ${manager_id});`;
            if(index === employees.name.lenth -1){
            sql =`INSERT INTO employee (role_id, first_name, last_name)VALUES
                ("${role_id}", "${firstName}", "${lastName}");`;
            }
            dbCon.query(sql,(err,row)=>{
                if(err)throw err;
                console.log("Employee added");
                start();
            });
        });
    });
};


        
    

