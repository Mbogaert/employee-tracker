INSERT INTO departments (name) 
VALUES
    ('front end'),
    ('back end'),
    ('administration');

INSERT INTO roles (title, salary, departments_id) 
VALUES
    ('manager', 60000, 1),
    ('associate', 30000, 1),
    ('CEO', 100000, 2);