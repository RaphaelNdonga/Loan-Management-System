CREATE DATABASE lending;

CREATE TABLE clients (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  contactNumber INT,
  email VARCHAR(255),
  address VARCHAR(255),
  username VARCHAR(255)
);

CREATE TABLE admin (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  contactNumber INT,
  email VARCHAR(255),
  address VARCHAR(255),
  password VARCHAR(255),
  username VARCHAR(255)
);

CREATE TABLE loans (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INT,
  balance NUMERIC(12,2),
  gross_loan NUMERIC(12,2),
  amort NUMERIC(12,2),
  terms INT,
  date_released TIMESTAMP WITHOUT TIME ZONE,
  maturity_date DATE,
  type VARCHAR(255),
  status VARCHAR(255),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE payments(
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INT,
  loan_id INT,
  amount NUMERIC(12,2),
  new_balance NUMERIC(12,2),
  collection_date TIMESTAMP WITHOUT TIME ZONE,
  collected_by VARCHAR(255),
  method VARCHAR(255),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (loan_id) REFERENCES loans(id)
);


-- DATA
INSERT INTO admin(firstname, lastname, contactnumber, email, address, password, username)
VALUES('TonyAdmin', 'Stark', 777888, 'tonystarkadmin@gmail.com', 'New York', 'password', 'notTonyStarkAdmin');

-- ADMIN
-- CLIENTS
INSERT INTO clients(firstname, lastname, contactnumber, email, address, username)
VALUES ('Elon', 'Musk', 444333, 'elonmusk@gmail.com', 'Boca Chica, Texas',  'notElonMusk');

INSERT INTO clients(firstname, lastname, contactnumber, email, address, username)
VALUES ('Peter', 'Parker', 555666, 'peterparker@gmail.com', 'New York', 'notPeterParker');

INSERT INTO clients(firstname, lastname, contactnumber, email, address, username)
VALUES ('Tony', 'Stark', 777888, 'tonystark@gmail.com', 'New York', 'notTonyStark');

INSERT INTO clients(firstname, lastname, contactnumber, email, address, username)
VALUES ('Bruce', 'Banner', 999000, 'bruce@gmail.com', 'New York', 'notHulk');

INSERT INTO clients(firstname, lastname, contactnumber, email, address, username)
VALUES ('Stephen', 'Strange', 111222, 'stephen@gmail.com', 'New York', 'notStrange');

UPDATE clients SET firstname = 'Ian Czar', lastname = 'Dino', contactNumber = 112233, address = 'Daraga Albay', email = 'ianczar@gmail.com', username = 'ian2' WHERE id = 4 RETURNING *;

-- LOANS
INSERT INTO loans(client_id, balance, gross_loan, amort, terms, date_released, maturity_date, type, status) 
VALUES (1, 5000, 5000, 2500, 1, '2023-02-04 05:30:01', '2023-03-04', 'Personal Loan', 'Pending');

INSERT INTO loans(client_id, balance, gross_loan, amort, terms, date_released, maturity_date, type, status) 
VALUES (2, 5000, 5000, 2500, 1, '2023-02-04 05:30:01', '2023-03-04', 'Personal Loan', 'Pending');

UPDATE loans SET type = 'Salary Loan', balance = 0, gross_loan = 5000, amort = 2500, terms = 2500, date_released = '2023-02-04', maturity_date = '2023-03-04', status = 'Disbursed' WHERE id = 4 RETURNING *;

-- PAYMENTS
INSERT INTO payments(client_id, loan_id, amount, new_balance, collection_date, collected_by, method) 
VALUES (1, 1, 5000, 0, '2023-03-04', 'admin', 'ATM');

INSERT INTO payments(client_id, loan_id, amount, new_balance, collection_date, collected_by, method) 
VALUES (2, 2, 5000, 0, '2023-03-04', 'admin', 'ATM');

-- DELETE should fail because of payment_client constraint

DELETE FROM clients WHERE id=2;

-- DELETE should also fail because of payment_loan constraint
DELETE FROM loans WHERE id=1;


-- JOINED DATA
SELECT * FROM clients INNER JOIN loans ON clients.id = loans.client_id;
--! SHOWS BOTH THAT HAS TRUE CONDITION

SELECT * FROM clients AS c LEFT JOIN loans AS t ON c.id = t.client_id WHERE c.id = 1;

-- DELETE should now work 
DELETE FROM payments WHERE client_id=2;
DELETE FROM loans WHERE id=2;
DELETE FROM clients WHERE id=2;

