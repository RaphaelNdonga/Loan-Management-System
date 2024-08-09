# FRONTEND
### Issue 1
Impossible to register. /register endpoint always redirects to /login.

steps to reproduce:
click `Get Started` button.

> I fixed this issue by removing the necessity of authentication on this endpoint. This was to allow me to be able to create a user and be able to test the rest of the application.

### Issue 2
Authenticated Session is being maintained using `useState` which is unreliable.

steps to reproduce:
After logging in, clicking back resets the session to `unAuthenticated`.