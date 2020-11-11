// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql"),;
const { join } = require("path");

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
     var con = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: "*Itzael2019*",
         database: "employtrac_db",
         multipleStatements: true
     });
        
     // Connecting to database
    dbCon.connect((err)=>{
    if(err) {
        throw err;
    }
     console.log(connected);
    start();
    
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
updateEmpManager(){
    let employee = {
        id: [],
        name: [],
    };
    let sql = "SELECT * FROM employee";
    dbCon.query(sql,(err,row)=>{
        if(err)throw err;
        for(emp of row){
            employee.name.push(emp.first_name + " " + emp.last_name);
        }
        inquirer
        .prompt({
            name: "name",
            type: "list",
            message: "Select employee",
            choices: employee.name,
        })
        .then((input)=>{
            let index = employee.indexOf(input.name);
            let id = employee.id[index];
            inquirer
            .prompt({
                name: "manager",
                type: "list",
                message: "Select manager",
                choices: employee.name,
            })
            .then((input)=>{
                let index = employee.indexOf(input.name);
                let emp_id = employee.id[index];
                let sql = `UPDATE employee SET manager_id = ${emp_id} WHERE id = ${id};`;
                
                dbCon.query(sql,(err,row)=>{
                    if(err)throw err;
                    console.log("Updated employee manager");
                    start();
                  });
                });
             });
          });
       };
function viewByManager(){
    let employee = {
        id: [],
        name: [],
    };
    let sql = "SELECT *FROM employee;";
    dbCon.query(sql,(err,row)=>{
        if(err)throw err;
        for (emp of row){
            employee.name.push(emp,first_name + " " + emp.last_name);
        }
        inquirer
        .prompt({
            name: "name",
            type: " list",
            message: "Select employee",
            choices: employee.name,
          })
            .then((input)=>{
            let index = employee.name.indexOf(input.name);
            let man_id = employee.emp_id[index];
            let sqlSql = `SELECT * FROM employee WHERE manager_id = "${man_id}";`;
            dbCon.query(sql,(err,row)=>{
                if(err)throw err;
                console.table(row);
                start();
             });
          });
      });
    };
    function removeDepartments(){  
        let departments = [],
        let sql = "SELECT * FROM department;";
            dbCon.query(sql,(err,row)=>{
                if(err)throw err;
                for(dep of row){
                    department.push(dep.name);
                }
                inquirer
                .prompt({
                    name: "department",
                    type: "list",
                    message: "Which department do you want to remove?";
                    choices: departments,
                })
                .then((input)=>{
                    let sql = `DELETE FROM department WHERE name = "${input.department}"`;
                    dbCon.query(sql,(err,row)=>{
                        if(err)throw err;
                        console.log("Department deleted");
                        start();
                      })
                    })
                 })
               } 
               function removeRole(){
                   let roles = {
                       id: [],
                       title: [],
                   };
                   let sql = "SELECT * FROM role;";
                   dbCon.query(sql,(err,row)=>{
                       if(err)throw err;
                       for(rol of row){
                           roles.id.push(rol.id);
                           roles.title.push(rol.title);
                       }
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
                           let sql = `DELETE FROM role WHERE id = "${role_id}"`;

                           dbCon.query(sql,(err,row)=>{
                               if(err)throw err;
                               console.log("Role removed");
                               start();
                           });
                       });
                   });
               };
               function removeEmployee(){
                   let employees = {
                       id: [],
                       name: [],
                   };
                   let sql = "SELECT * FROM employee";

                   dbCon.query(sql,(err,row)=>{
                       if(err)throw err;
                       for(emp of row){
                           employees.name.push(emp.first_name + " " + emp.last_name);
                           employees.id.push(emp.id);
                       }
                       inquirer
                             .prompt({
                               name: "name",
                               type: "list",
                               message: "Select employee",
                               choices: employees.name,
                             })
                             .then((input) => {
                               let index = employees.name.indexOf(input.name);
                               let id = employees.id[index];
                               let sql = `DELETE FROM employee WHERE id=${id}`;
                               con.query(sql, (err) => {
                                 if (err) throw err;
                                 console.log("Employee deleted");
                                 start();
                               });
                             });
                         });
                       };
                       const totalBudget = () => {
                         let departments = [];
                         let sql = "SELECT * FROM department;";
                         con.query(sql, (err, row) => {
                           if (err) throw err;
                           for (dep of row) {
                             departments.push(dep.name);
                           }
                           inquirer
                             .prompt({
                               name: "department",
                               type: "list",
                               message: "Select department to view budget",
                               choices: departments,
                             })
                             .then((input) => {
                               let sql = `CREATE TABLE sumSalary ( SELECT employee.first_name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id AND department.name = "${input.department}"); SELECT SUM(salary) total FROM sumSalary; DROP TABLE sumSalary;`;
                               con.query(sql, (err, row) => {
                                 if (err) throw err;
                                 console.table(row[1])
                                 start();
                               });
                             });
                         });
                       };
                         
                   
                

    



        
    

