INSERT INTO department (name)
VALUES
('Service'),
('HR'),
('Finance'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Service Representative', 100000, 1),
('HR Representative', 123000, 2),
('Financial Advisor', 111000, 3),
('Sales Representative', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Lucy', 'Sanders', 1, 2),
('JJ', 'Cool', 2, NULL),
('Marc', 'Jacobs', 3, NULL),
('Daniel', 'Thyme', 4, NULL);