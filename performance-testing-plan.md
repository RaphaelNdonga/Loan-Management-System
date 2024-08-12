# SECURITY TESTING

## SQL INJECTION VULNERABILITIES
Critical security issues spotted on the backend server and database related to SQL INJECTION vulnerabilites.

Test Case addressing this: BTC-004 

## XSS VULNERABILITIES
Using the React Library in this project has prevented most of the attack vectors stemming from XSS.

# PERFORMANCE TESTING
The following is a basic plan for performance testing to ensure the application can handle concurrent operations.

1. Set goals for what you intend to achieve

2. Choose the correct tools for the job. Cypress can be used on the frontend while an API for load testing used on the backend

3. Design test cases that simulate user interactions on the React app and api calls on the backend.

4. Conduct incremental load tests, gradually increasing the pressure on the app until it reaches its limit.

5. Analyse the results and optimize

