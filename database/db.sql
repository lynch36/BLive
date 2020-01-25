CREATE DATABASE database_books;

USE database_books;

--Users Table--
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

--Books Tables--
CREATE TABLE books(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL, 
    autor VARCHAR(150) NOT NULL,
    descripcion TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    img VARCHAR(300) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE books
    ADD PRIMARY KEY(id);

ALTER TABLE books
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

--Wish Books Tables--
CREATE TABLE wishBooks(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL, 
    autor VARCHAR(150) NOT NULL,
    descripcion TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    img VARCHAR(300) NOT NULL,
    CONSTRAINT fk_userr FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE wishBooks
    ADD PRIMARY KEY(id);

ALTER TABLE wishBooks
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;