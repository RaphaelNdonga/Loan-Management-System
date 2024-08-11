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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200

    Redirects to /home page

   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    url includes /emailClient
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
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

    Response status code 200
   
- __Priority__

    High
   
- __Type of Test__

    Functional test