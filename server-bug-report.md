
# BACKEND SERVER

### Issue 1 - error: relation "admins" does not exist
steps to reproduce:
```
POST request on endpoint: /login
```

### Issue 2 - TypeError: Cannot read properties of undefined (reading 'password')
steps to reproduce:

```
POST request on endpoint: /login using name and password that is not in database
```

### Issue 3 - Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
steps to reproduce:

```
POST request on endpoint: /register using details that already exist
```

### Issue 4 - Sending Unexpected token 'U', "User already exist" is not valid JSON
steps to reproduce

```
POST request on endpoint: /register using details that already exist
```

### Issue 5 - /addAdmin endpoint is exactly the same as /register endpoint
see server/index.js Lines 89 & Line 49

### Issue 6 - /addClient returns query object instead of json object with user data
See server/index.js Line 81

### Issue 7 - There is an auth required in GET /client/:id and not in GET /admin/:id

### Issue 8 - Conflicting endpoints: POST /loans/ occurs twice
see server/index.js Line 331 & Line 508

### Issue 9 - SQL Injection Vulnerability
The database is vulnerable to a sequal injection at the following endpoints:
1. POST /login
2. POST /register
3. POST /addClient
4. PATCH /client/:id
5. POST /loans
6. POST /loans/:id
7. PATCH /loans/:id

