USE employtrac_db;


INSERT INTO department (name)VALUES("Development");

INSERT INTO role (title, salary, department_id)VALUES("Lead Engineer", 300000, 1);

INSERT INTO employee (first_name, last_name, role_id)VALUES("Raul", "Oropesa", 1);