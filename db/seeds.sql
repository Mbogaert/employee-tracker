INSERT INTO departments (name) 
VALUES
    ('administration'),
    ('customer service'),
    ('sales');

INSERT INTO roles (title, salary, departments_id) 
VALUES
    ('manager', 60000, 1),
    ('associate', 30000, 1),
    ('contracted', 10000, 1),
    ('manager', 60000, 2),
    ('associate', 30000, 2),
    ('somethingelse', 10000, 2),
    ('manager', 60000, 3),
    ('associate', 30000, 3),
    ('anotherrole', 10000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
    ('Mat', 'Bog', 1, NULL),
    ('Tommy', 'Coop', 2, 1),
    ('Hayley', 'Hall', 3, 1),
    ('Dawn', 'Wyl', 4, NULL),
    ('Mak', 'Cor', 5, 4),
    ('Hayden', 'Hall', 6, 4),
    ('Anne', 'Bog', 7, NULL),
    ('Lexi', 'Mar', 8, 7),
    ('Mark', 'Head', 9, 7),
    ('Max', 'Pain', 3, 1),
    ('Taylor', 'Coop', 6, 2),
    ('Anthony', 'Webb', 9, 3);