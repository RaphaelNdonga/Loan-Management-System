describe('Register and Login functionality', () => {
  let randomNumber = Math.floor(Math.random() * 10000000000000) + 1
  let testerUsername = `tester${randomNumber}`
  let testerPassword = "password"
  let client
  let loan
  let payment
  it('Goes to register page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains("Get Started").click()
    cy.url().should("include", "/register")
    cy.get('input[name="firstname"]').type("Tester")
    cy.get('input[name="lastname"]').type("Mctester")
    cy.get('input[name="contactNumber"]').type("0712345678")
    cy.get('input[name="address"]').type("Nairobi, Kenya")
    cy.get('input[name="email"]').type("tester@testing.com")
    cy.get('input[name="username"]').type(testerUsername)
    cy.get('input[name="password"]').type(testerPassword)
    cy.intercept("POST", "http://localhost:8000/register").as("registerApiCall")
    cy.contains("Create Account").click()
    cy.wait("@registerApiCall").its("response.statusCode").should("eq", 200)
  })

  it('Logs in', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type(testerUsername)
    cy.get('input[name="password"]').type(testerPassword)
    cy.intercept("POST", "http://localhost:8000/login").as("loginApiCall")
    cy.contains("Sign In").click()
    cy.wait("@loginApiCall").its("response.statusCode").should("eq", 200)
    cy.url().should("include", "/home")
  })

  it('Emails client from /emailClient page', () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="emailBtn-0"]').click()
    cy.url().should("include", "/emailClient")
    cy.get('[data-cy="check-0"]').click()
    cy.get('textarea[name="message"]').type("Greetings and thanks in advance")
    cy.intercept("POST", "https://api.emailjs.com/api/v1.0/email/send-form").as("emailjsApiCall")
    cy.contains("Send message").click()
    cy.wait("@emailjsApiCall").its("response.statusCode").should("eq", 200)
  })

  it('Goes to email tab from sidebar', () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="emailClientLink"]').click()
    cy.url().should("include", "/emailClient")
  })

  it("Edits Loans from /Borrower page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="viewBtn-1"]').should("exist").click()
    cy.url().should("include", "/editLoan")
    cy.get('select[name="type"]').select(1)
    cy.get('select[name="terms"]').select(1)
    cy.get('input[name="gross_loan"]').clear().type(Math.random() * 1000)
    cy.get('input[name="balance"]').clear().type(Math.random() * 2000)
    cy.get('input[name="amort"]').clear().type(Math.floor(Math.random() * 1000))
    cy.get('input[name="date_released"]').clear().type(`2023-01-01`)
    cy.get('input[name="maturity_date"]').clear().type(`2023-01-01`)
    cy.url().then((url) => {
      const loanId = url.split("/").pop()
      cy.intercept("PATCH", `http://localhost:8000/loans/${loanId}`).as("updateApiCall")
      cy.get('[data-cy="updateBtn"]').click()
      cy.wait("@updateApiCall").its("response.statusCode").should("eq", 200)
    })
  })

  it("Adds borrower from /borrowers page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.contains("Add Borrower").click()
    cy.url().should("include", "/addBorrower")
    cy.get('input[name="firstname"]').type("Tester")
    cy.get('input[name="lastname"]').type("Mctester")
    cy.get('input[name="contactNumber"]').type("0712345678")
    cy.get('input[name="address"]').type("Nairobi, Kenya")
    cy.get('input[name="email"]').type("tester@testing.com")
    cy.get('input[name="username"]').type(testerUsername + Math.random())
    cy.intercept("POST", "http://localhost:8000/addClient").as("addClientApiCall")
    cy.contains("Save").click()
    cy.wait("@addClientApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      client = interception.response.body.rows[0]
      expect(client).to.exist
      cy.log("Client: ", JSON.stringify(client))
    })
  })

  it("adds new loan and edits loan from /Borrower page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.get(`[data-cy="borrowerLink-${client.id}"]`).click()
    cy.url().should("include", `/Borrower/${client.id}`)

    // ********** Adding loan **********

    cy.contains("Add Loan").click()
    cy.url().should("include", "/addLoan")
    cy.get('select[name="type"]').select(1)
    cy.get('input[name="gross_loan"]').type(randomNumber % 1000)
    cy.get('input[name="balance"]').type(randomNumber % 500)
    cy.get('input[name="amort"]').type(randomNumber % 200)
    cy.get('input[name="date_released"]').clear().type(`2023-10-12T11:10:10`)
    cy.get('input[name="maturity_date"]').clear().type(`2023-01-01`)
    cy.get('select[name="terms"]').select(1)
    cy.intercept("POST", `http://localhost:8000/loans/${client.id}`).as("addLoanApiCall")
    cy.contains("Add New Loan").click()
    cy.wait("@addLoanApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      loan = interception.response.body
      expect(loan).to.exist
      cy.url().should("include", `/Borrower/${client.id}`)

      // ********** UPDATING loan **********
      cy.get(`[data-cy="editLoanLink-${loan.id}"]`).click()
      cy.url().should("include", "/editLoan")
      // Only necessary check is whether it is in /editLoan page. edit loan functionality has already been tested above

    })
  })
  it("Adds payment from /Borrower page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.get(`[data-cy="borrowerLink-${client.id}"]`).click()
    cy.url().should("include", `/Borrower/${client.id}`)
    cy.get(`[data-cy="paymentLink-${loan.id}"]`).click()
    cy.url().should("include", `/payment`)
    cy.get('input[name="collection_date"]').type("2023-01-01")
    cy.get('input[name="collected_by"]').type("2023-02-01")
    cy.get('input[name="amount"]').type(loan.balance)
    cy.get('select[name="method"]').select(1)
    cy.intercept("POST", `http://localhost:8000/payments/${loan.id}`).as("paymentApiCall")
    cy.contains("Add Payment").click()
    cy.wait("@paymentApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      payment = interception.response.body
      expect(payment).to.exist
    })
  })

  it("Deletes payment and deletes loan from /Borrower page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.get(`[data-cy="borrowerLink-${client.id}"]`).click()
    cy.url().should("include", `/Borrower/${client.id}`)
    cy.intercept("DELETE", `http://localhost:8000/payment/${payment.id}`).as("deletePaymentApiCall")
    cy.get(`[data-cy="deletePaymentBtn-${payment.id}"]`).click()
    cy.wait("@deletePaymentApiCall").its("response.statusCode").should("eq", 200)
    cy.url().should("include", `/Borrower/${client.id}`)
    cy.intercept("DELETE", `http://localhost:8000/loans/${loan.id}`).as("deleteLoanApiCall")
    cy.get(`[data-cy="deleteLoanBtn-${loan.id}"]`).click({ force: true })
    cy.wait("@deleteLoanApiCall").its("response.statusCode").should("eq", 200)
  })

  it("Updates client from /Borrower page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.get(`[data-cy="borrowerLink-${client.id}"]`).click()
    cy.contains("UPDATE CLIENT").click()
    cy.url().should("include", "/editBorrower")
    cy.get('input[name="firstname"]').clear().type("Testerxx")
    cy.get('input[name="lastname"]').clear().type("Mctesterxx")
    cy.get('input[name="contactNumber"]').clear().type("0712345679")
    cy.get('input[name="address"]').clear().type("Mombasa, Kenya")
    cy.get('input[name="email"]').clear().type("testerxx@testing.com")
    cy.intercept("PATCH", `http://localhost:8000/clients/${client.id}`).as("updateClientApiCall")
    cy.get('[data-cy="updateBtn"]').click()
    cy.wait("@updateClientApiCall").its("response.statusCode").should("eq", 200)
  })

  it("Adds a loan from /loans page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="loansLink"]').click()
    cy.contains("Add Loan").click()
    cy.url().should("include", "/addLoan")
    cy.get('select[name="type"]').select(1)
    cy.get('select[name="status"]').select(1)
    cy.get('input[name="client_id"]').type(client.id)
    cy.get('input[name="gross_loan"]').type(randomNumber % 1000)
    cy.get('input[name="balance"]').type(randomNumber % 500)
    cy.get('input[name="amort"]').type(randomNumber % 200)
    cy.get('input[name="date_released"]').clear().type(`2023-10-12T11:10:10`)
    cy.get('input[name="maturity_date"]').clear().type(`2023-01-01`)
    cy.get('select[name="terms"]').select(1)

    cy.intercept("POST", `http://localhost:8000/loans`).as("addLoanApiCall")
    cy.get('[data-cy="addLoanBtn"]').click()
    cy.wait("@addLoanApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      loan = interception.response.body
      expect(loan).to.exist
    })
  })
  it("Adds payment from /payments page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="paymentsLink"]').click()
    cy.contains("Add Payment").click()
    cy.url().should("include", "/borrowers")
    cy.get(`[data-cy="borrowerLink-${client.id}"]`).click()
    cy.url().should("include", `/Borrower/${client.id}`)
    cy.get(`[data-cy="paymentLink-${loan.id}"]`).click()
    cy.url().should("include", `/payment`)
    cy.get('input[name="collection_date"]').type("2023-01-01")
    cy.get('input[name="collected_by"]').type("2023-02-01")
    cy.get('input[name="amount"]').type(loan.balance)
    cy.get('select[name="method"]').select(1)
    cy.intercept("POST", `http://localhost:8000/payments/${loan.id}`).as("paymentApiCall")
    cy.contains("Add Payment").click()
    cy.wait("@paymentApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      payment = interception.response.body
      expect(payment).to.exist
    })
  })
  it("Deletes payment from /payments page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="paymentsLink"]').click()
    cy.intercept("DELETE", `http://localhost:8000/payment/${payment.id}`).as("deletePaymentApiCall")
    cy.get(`[data-cy="deletePaymentBtn-${payment.id}"]`).click()
    cy.wait("@deletePaymentApiCall").its("response.statusCode").should("eq", 200)
  })
  it("Updates and deletes loan added from /loans page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="loansLink"]').click()
    cy.get(`[data-cy="editLoanLink-${loan.id}"]`).click()
    cy.url().should("include", "/editLoan")
    cy.go("back")
    cy.intercept("DELETE", `http://localhost:8000/loans/${loan.id}`).as("deleteLoanApiCall")
    cy.get(`[data-cy="deleteLoanBtn-${loan.id}"]`).click()
    cy.wait("@deleteLoanApiCall").its("response.statusCode").should("eq", 200)
  })



  it("Deletes client from /borrowers page", () => {
    cy.login(testerUsername, testerPassword)
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.intercept("DELETE", `http://localhost:8000/clients/${client.id}`).as("deleteClientApiCall")
    cy.get(`[data-cy="deleteBtn-${client.id}"]`).click()
    cy.wait("@deleteClientApiCall").its("response.statusCode").should("eq", 200)
  })
})