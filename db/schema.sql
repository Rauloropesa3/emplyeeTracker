DROP DATABASE IF EXISTS;

CREATE DATABASE employtrac_db;

USE employtrac_db;


CREATE TABLE department(
id INT AUTO_INCREMENT,
department_name name VARCHAR(30),
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
id INT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL ,
department_id INT,
primary key(id)
);






