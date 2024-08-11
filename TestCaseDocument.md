# TEST CASE DOCUMENT

Project Name: Loan Management System

## 1. INTRODUCTION
   ### 1.1 Purpose
   Develop a comprehensive suite of test cases focusing on the core features: loan management, client management, and payments management.
   ### 1.2 Scope
   Frontend, Backend and Database

## 2. TEST ENVIRONMENT
   ### 2.1 Frontend setup
   Navigate to /client
   Run:

   ```
    npm i && npm start
   ```

   ### 2.2 Backend setup
   Navigate to /server
   Run:

   ```
    npm i && npm start
   ```

   ### 2.3 Database setup
   Have Postgresql installed before hand.
   Run:

   ```
    psql -U {your_username} -d lending -f {/your_path/server/database/database.sql}
   ```

## 3. TEST CASES

Preconditions:
Setup the frontend, backend and database as above

### 3.1 Frontend Test Cases

Test Steps

   Navigate to /client
   Run: 
   ```
    npm run test
   ```

#### 3.1.1 Test Case ID: FTC-001 Frontend Registration

- __Description__

   Frontend registers user correctly
   
- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.2 Test Case ID: FTC-002 Frontend Login

- __Description__

   Frontend logs in user correctly
   
- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200

    PASS - Redirects to /home page

   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.3 Test Case ID: FTC-003 Emails client

- __Description__

Sends email to client from /emailClient page
   
- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.4 Test Case ID: FTC-004 Navigates to /emailClient page

- __Description__

Navigates to /emailClient page from the side bar
   
- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - url includes /emailClient
   
- __Priority__

    Low
   
- __Type of Test__

    Functional test

#### 3.1.5 Test Case ID: FTC-005 Edits Loan from /Borrower page

- __Description__

Navigates to /editLoan page and edits loan
   
- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test


#### 3.1.6 Test Case ID: FTC-006 Adds borrower from /borrowers page

- __Description__

Adds borrower from /borrowers page   

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test


#### 3.1.7 Test Case ID: FTC-007 Adds new loan and edits from /borrower page

- __Description__

Adds new loan and edits from /borrower page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.8 Test Case ID: FTC-008 Adds payment from /Borrower page

- __Description__

Adds payment from /Borrower page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.9 Test Case ID: FTC-009 Deletes payment and deletes loan from /Borrower page

- __Description__

Deletes payment and deletes loan from /Borrower page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.10 Test Case ID: FTC-010 Updates client from /Borrower page

- __Description__

Updates client from /Borrower page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.11 Test Case ID: FTC-011 Adds a loan from /loans page

- __Description__

Adds a loan from /loans page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.12 Test Case ID: FTC-012 Adds payment from /payments page

- __Description__

Adds payment from /payments page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.13 Test Case ID: FTC-013 Deletes payment from /payments page

- __Description__

 Deletes payment from /payments page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.14 Test Case ID: FTC-014 Updates and deletes loan added from /loans page

- __Description__

Updates and deletes loan added from /loans page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.1.15 Test Case ID: FTC-015 Deletes client from /borrowers page

- __Description__

Deletes client from /borrowers page

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

### 3.2 Backend Test Cases
Test Steps

   Navigate to /client
   Run: 
   ```
    npm run test
   ```

#### 3.2.1 Test Case ID: BTC-001 Connects to database

- __Description__

    Connects to database

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.2.2 Test Case ID: BTC-002 JWT Token test

- __Description__

    Generates JWT token and checks whether the token is valid

- __Expected Results__

    Tests pass
   
- __Actual Results__

    Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__

    Medium
   
- __Type of Test__

    Functional test

#### 3.2.3 Test Case ID: BTC-003 Backend registration

- __Description__

1. Check whether registering a new user is 200 (ok)

2. Check whether registering an already registered user is 401 (not ok)

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

1. PASS - Response status code 200
2. PASS - Response status code 401

   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.4 Test Case ID: BTC-004 SQL Injection Vulnerability

- __Description__

    Test the following endpoints for SQL injection vulnerabilities:

    POST /register

    POST /login

    POST/addAdmin

    POST /addClient

    POST /loans
    
    POST /loans/:id

    PATCH /loans/:id:

    POST /payments/:id
    
- __Expected Results__

    Tests pass
   
- __Actual Results__

    Tests Fail
   
- __Pass/Fail Criteria__

    PASS - Response status code 400 (Bad Request)
   
- __Priority__

    High
   
- __Type of Test__

    Security test

#### 3.2.5 Test Case ID: BTC-005 Backend login

- __Description__

    Check whether login is correct

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.6 Test Case ID: BTC-006 gets profile

- __Description__

    Gets profile of admin

- __Expected Results__

    Tests pass
   
- __Actual Results__

    Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.5 Test Case ID: BTC-007 gets all admins

- __Description__

    Gets all admins

- __Expected Results__

    Tests pass
   
- __Actual Results__

    Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.5 Test Case ID: BTC-008 deletes admin

- __Description__

    Deletes admin

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.6 Test Case ID: BTC-009 adds admin

- __Description__

    Adds admin

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.7 Test Case ID: BTC-010 adds client 

- __Description__

    Adds client on POST /addClient endpoint

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.8 Test Case ID: BTC-011 gets all clients

- __Description__

    Gets all clients on GET /allClients

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.9 Test Case ID: BTC-012 gets client through id

- __Description__

    gets client through id on GET /client/:id

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.10 Test Case ID: BTC-013 gets client through email

- __Description__

    Gets client through email on endpoint GET /email/:email

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.11 Test Case ID: BTC-014 Updates client data

- __Description__

    Updates client data on endpoint PATCH /client/:id

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test

#### 3.2.12 Test Case ID: BTC-015 Deletes client

- __Description__

    Deletes client on endpoint DELETE /clients/:id

- __Expected Results__

   Tests pass
   
- __Actual Results__

   Tests pass
   
- __Pass/Fail Criteria__

    PASS - Response status code 200
   
- __Priority__
   
    Medium

- __Type of Test__

    Functional test