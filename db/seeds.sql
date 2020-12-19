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

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
    ('Mat', 'Bog', 1, NULL),
    ('Tommy', 'Coop', 2, 1),
    ('Hayley', 'Hall', 2, 1);