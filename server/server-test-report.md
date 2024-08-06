# DATABASE 
Steps to reproduce:
Run: 
```
    psql -U *your_username* -d *lending* -f *path_to_database.sql*
```

### Issue 1
```sql
    CREATE DATABASE lending;
```
Creating the database in this file means that the tables will be created in another database, NOT `lending`

Also, if we are creating a database `lending`, it shouldn't be called `lendingapp` in the code:
```
server/pool.js Line 7
```

```javascript
const connectDatabase = () => {
    return new pg.Pool({
    user: 'postgres',
    password: '121397',
    database: 'lending',
    host: 'localhost',
    });
};
```

### Issue 2
```
psql:Loan-Management-System/server/database/database.sql:22: ERROR:  syntax error at or near "L"
```

### Issue 3
```
psql:Loan-Management-System/server/database/database.sql:36: ERROR:  column "client_id" referenced in foreign key constraint does not exist
```

### Issue 4
```
psql:Loan-Management-System/server/database/database.sql:49: ERROR:  column "client_id" referenced in foreign key constraint does not exist
```

### Issue 5
```
psql:Loan-Management-System/server/database/database.sql:73: ERROR:  syntax error at or near "INSERT"
```

From this point onwards, loan and admin relations were not created.
I took on the role of fixing the errors, even though this is not explicitly the QA job. I did so to allow me to go on with the test report, just as it would happen if I was working with a team.

### Issue 6
```
psql:/Users/raphaelndonga/incourage/Loan-Management-System/server/database/database.sql:86: ERROR:  invalid input syntax for type integer: "94d5c3de-4a51-46d6-83cf-2e0a14d7a643"
 SELECT * FROM clients AS c LEFT JOIN loans AS t ON c.client_id = l.client_id WHERE c.client_id = '94d5c3de-4a51-46d6-83cf-2e0a14d7a643';
```
Also:

ERROR:  column c.client_id does not exist

ERROR:  missing FROM-clause entry for table "l"

### Issue 7
```
psql:/Users/raphaelndonga/incourage/Loan-Management-System/server/database/database.sql:69: ERROR:  column "password" of relation "clients" does not exist
UPDATE clients SET firstname = 'Ian Czar', lastname = 'Dino', contactNumber = 112233, address = 'Daraga Albay', email = 'ianczar@gmail.com', username = 'ian2', password = '12345' WHERE id = 9 RETURNING *;
```

### Issue 8
```
psql:/Users/raphaelndonga/incourage/Loan-Management-System/server/database/database.sql:79: ERROR:  insert or update on table "payments" violates foreign key constraint "payments_loan_id_fkey"
DETAIL:  Key (loan_id)=(2) is not present in table "loans".
```

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