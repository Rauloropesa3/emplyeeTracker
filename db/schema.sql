DROP DATABASE IF EXISTS employtrac_db;

CREATE DATABASE employtrac_db;

USE employtrac_db;


CREATE TABLE department(
id INT AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY(id)
);
CREATE TABLE employee(
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT NULL,
primary key(id)
);
CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DEC(10, 2) NOT NULL,
department_id INT NOT NULL,
primary key(id)
);






