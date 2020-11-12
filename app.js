// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");


let options = [
    "Add department",
    "Add role",
    "Add employee",
    "View departments",
    "View roles",
    "View employees",
    "Update roles",
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
     var dbCon = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: "*Itzael2019*",
         database: "employtrac_db",
         multipleStatements: true
     });
      dbCon.connect = () => {
           if (err) throw err;
           console.log("Connected");
           start();
         };
    
    function start(){
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "what would you like to do?",
            choices: options,
        })
        .then((answer)=>{
            if(answer.action == "Add department"){
                addDepartment();
            }if(answer.action == "Add role"){
                addRole();
            }if(answer.action == "Add employee"){
                addEmployee();
            }if(answer.action == "View departments"){
                "SELECT * FROM department;";
                dbCon.query(sql,(err,row)=>{
                    if(err)throw err;
                    console.table(row);
                    start();
                });
            }if(answer.action == "View roles"){
                "SELECT * FROM role;";
                dbCon.connect = () => {
                      if (err) throw err;
                      console.log("Connected");
                      start();
                    };
            
            }if(answer.action == "View employees"){
                "SELECT * FROM employee;";
                dbCon.connect = () => {
                      if (err) throw err;
                      console.log("Connected");
                      start();
                    };
            }if(answer.action == "Update role"){
                updateEmpRole();
            }if(answer.action == "Exit"){
                process.exit();
            }
        });
}
    const addDepartment = () =>{
    inquirer
    .prompt({
        name: "departmentName",
        type: "input",
        message: "What department would you like to add?",
    })
    .then((input)=>{
        if(input){
            console.log(input);
            `INSERT INTO department (department_name) VALUES ("${input.departmentName}");`;
            dbCon.connect = () => {
                  if (err) throw err;
                  console.log("Connected");
                  start();
                   }
                };
        const addRole = () =>{
    let departments = {
        name: [],
        id: [],
    }
    "SELECT * FROM department;";
    dbCon.connect = () => {
          if (err) throw err;
          console.log("Connected");
        for(dep of row)
          start();
        };
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

            dbCon.connect = () => {
                  if (err) throw err;
                  console.log("Connected");
                  start();
                };
            });
        });
    const addEmployee = () =>{
    let roles = {
        id: [],
        title: [],
    };
    "SELECT * FROM role;";
    dbCon.connect = () => {
          if (err) throw err;
          console.log("Connected");
        for(rol of roll){    
          start();
        };
            roles.id.push(rol.id);
            roles.title.push(rol.title);
        }
    };
    let employees = {
        id: [],
        name: [],
    };
    "SELECT * FROM employee";
    dbCon.connect = () => {
          if (err) throw err;
          console.log("Connected");
          start();
    
            employees.name.push(emp.first_name + " " + emp.last_name);
            employees.id.push(emp.id);
        }
        employees.name.push("None");
        employees.id.push(0);
    
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
            `INSERT INTO employee (role_id, first_name, last_name, manager_id)
            VALUES("${role_id}", "${firstName}", "${lastName}", ${manager_id});`;
            if(index === employees.name.lenth -1){
            let sql =`INSERT INTO employee (role_id, first_name, last_name)VALUES
                ("${role_id}", "${firstName}", "${lastName}");`;
            }
            dbCon.connect = () => {
                  if (err) throw err;
                  console.log("Connected");
                  start();
                };
              });
            });
        });    

const updateEmpRole = () => {
	  let roles = {
	    id: [],
	    title: [],
	  };
	  "SELECT * FROM role;";
	  dbCon.connect = () => {
          if (err)
        
	    for (rol of row) {
	      roles.id.push(rol.id);
	      roles.title.push(rol.title);
	    }
	  let employeeNames = {
	    id: [],
	    name: [],
	  };
	  "SELECT * FROM employee";
	  dbCon.connect = () => {
          if (err) throw err;
        };
	    for (emp of row) {
	      employeeNames.name.push(emp.first_name + " " + emp.last_name);
	      employeeNames.id.push(emp.id);
	    }
	    inquirer
	      .prompt({
	        name: "name",
	        type: "list",
	        message: "Select employee",
	        choices: employeeNames.name,
	      })
	      .then((input) => {
	        let index = employeeNames.name.indexOf(input.name);
	        let id = employeeNames.id[index];
	        inquirer
	          .prompt({
	            name: "role",
	            type: "list",
	            message: "Select role",
	            choices: roles.title,
	          })
	          .then((input) => {
	            let index = roles.title.indexOf(input.role);
	            let role_id = roles.id[index];
	            `UPDATE employee SET role_id=${role_id} WHERE id=${id};`;
	            dbCon.connect = () => {
          if (err) throw err;

	              console.log("Role updated");
	              start();
	            };
	          });
	      });
	  };
   }
}
