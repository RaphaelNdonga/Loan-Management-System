# DATABASE 
To perform Database testing

Run: 
```
    psql -U *your_username* -d *lending* -f *path_to_database.sql*
```

database.sql file performs all the CRUD operations that verify the integrity of the POSTGRESQL database. 

The original file had the following issues which were fixed:

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

## Database constraints that were validated:

loans_client_id_fkey

payments_client_id_fkey

payments_loan_id_fkey