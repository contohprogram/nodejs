CREATE DATABASE db_api;
USE db_api;

CREATE TABLE users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name varchar(255) DEFAULT NULL,
  last_name varchar(255) DEFAULT NULL
);

INSERT INTO users (id, first_name, last_name) VALUES(1, 'Steve', 'Rogers');
INSERT INTO users (id, first_name, last_name) VALUES(2, 'Angelina', 'Jolie');
INSERT INTO users (id, first_name, last_name) VALUES(3, 'Al', 'Pacino');
INSERT INTO users (id, first_name, last_name) VALUES(4, 'Scarlet', 'Johansson');