USE employtrac_db;


INSERT INTO department (name) VALUES("Sales Floor"),("Warehouse"),("Shipping & Recieving");

INSERT INTO role (title, salary, department_id)VALUES("Sales Clerk", 2150, 1),
("Cashier", 1870, 1),("Loss Prevention",2000, 1),("Stocker",1900, 1),
("Dock Worker", 1890, 2),("Inventory",1950, 2),("ForkLift Operator",2100, 2),
("Warehouse Clerk",1900, 2),("Recieving Clerk",1990, 3),("Shipping Officer",2275, 3);

INSERT INTO employee (role_id, first_name, last_name)VALUES(1,"Raul","Oropesa"),
(2,"Lupe","Ramirez"),(3,"Adrian","Felix"),(4, "Rudy", "Felix"),(5,"Itzael", "Oropesa");