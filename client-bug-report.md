# FRONTEND
### Issue 1
Impossible to register. /register endpoint always redirects to /login.

steps to reproduce:
click `Get Started` button.

> I fixed this issue by removing the necessity of authentication on this endpoint. This was to allow me to be able to create a user and be able to test the rest of the application.

### Issue 2
Authenticated Session is being maintained using `useState` which is unreliable.

steps to reproduce:
After logging in, clicking back resets the session to `unAuthenticated`. Or just refresh the page

### Issue 3
No feedback after user registers

steps to reproduce:
register new user

### Issue 5
useEffect being called infinitely. This causes severe performance issues in the app.

steps to reproduce:
Log in to home screen and check the network tab. `/allLoans` and `/allPayments` api endpoints are being called infinitely

> I fixed this issue by removing the useEffect dependency that was cyclic. I did this because the app was breaking down and I could not proceed with testing procedures.

### Issue 6
Some buttons are not entirely clickable. This causes a poor user experience:

steps to reproduce:
In /home, click the edge area of the email button in `Maturity Date` section and the edge area of the view button in `Loans For Approval`

### Issue 7
Full name input cannot be typed into in email form.

### Issue 8
Dates widget and approval widget display turn the cursor into a pointer yet they are not clickable. This is a confusing user experience.

steps to reproduce:
In /home, hover over `Maturity Date` and `Loans For Approval` sections 

### Issue 9
`<ToastContainer/>` in login page and EditLoan page is causing an error TypeError: Cannot read properties of undefined (reading 'content'). This leads to failing tests.

steps to reproduce:
-> Login
-> Login -> View Loans for approval -> Update loan -> View browser console

### Issue 10
Loans widget is calculating Total loans transacted incorrectly

steps to reproduce:
Visit /home

### Issue 11
Adding a loan causes the following error: 

```
syntax error at or near ","
```

steps to reproduce:
/addLoan/:id
Fill in the details but don't change the terms or they type of loan.

### Issue 12
It is possible to create a new loan with specific time, but when updating, you cannot set a specific time.

steps to reproduce:
/editLoan -> Date released

### Issue 13
loans that are not approved accept payments

steps to reproduce:
/Borrower/:clientId
Add a payment to a loan that is pending approval

### Issue 14
Selecting the first payment method does not register in the platform.

steps to reproduce:
/payment
select the first method, fill in the rest and add payment


### Issue 15
Double transaction. When you click add payment twice, it processes 2 payments before the first one is finished
steps to reproduce:
/payment
select the fill in and click `Add Payment` twice

### Issue 16
Deleting payment from /payments page does not work correctly. On the backend, it calls DELETE /loans with loan id instead of DELETE /payment with payment id

steps to reproduce:
visit /payments, 
delete one of the payments
