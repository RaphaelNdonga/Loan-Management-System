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