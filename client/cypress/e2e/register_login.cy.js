describe('Register and Login functionality', () => {
  let randomNumber = Math.floor(Math.random() * 10000000000000) + 1
  let testerUsername = `tester${randomNumber}`
  let testerPassword = "password"
  let client
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

  // it('Logs in', () => {
  //   cy.visit('http://localhost:3000/login')
  //   cy.get('input[name="username"]').type(testerUsername)
  //   cy.get('input[name="password"]').type(testerPassword)
  //   cy.intercept("POST", "http://localhost:8000/login").as("loginApiCall")
  //   cy.contains("Sign In").click()
  //   cy.wait("@loginApiCall").its("response.statusCode").should("eq", 200)
  //   cy.url().should("include", "/home")
  // })

  // it('Emails client', () => {
  //   cy.visit('http://localhost:3000/login')
  //   cy.get('input[name="username"]').type(testerUsername)
  //   cy.get('input[name="password"]').type(testerPassword)
  //   cy.contains("Sign In").click()
  //   cy.url().should("include", "/home")
  //   cy.get('[data-cy="emailBtn-0"]').click()
  //   cy.url().should("include", "/emailClient")
  //   cy.get('[data-cy="check-0"]').click()
  //   cy.get('textarea[name="message"]').type("Greetings and thanks in advance")
  //   //TODO: Look deeper into emailjs and how you can incorporate it into this test
  // })

  // it("Edits Loans", () => {
  //   cy.visit('http://localhost:3000/login')
  //   cy.get('input[name="username"]').type(testerUsername)
  //   cy.get('input[name="password"]').type(testerPassword)
  //   cy.contains("Sign In").click()
  //   cy.url().should("include", "/home")
  //   cy.get('[data-cy="viewBtn"]').should("exist").click()
  //   cy.url().should("include", "/editLoan")
  //   cy.get('select[name="type"]').select(1)
  //   cy.get('select[name="terms"]').select(1)
  //   cy.get('input[name="gross_loan"]').clear().type(Math.random() * 1000)
  //   cy.get('input[name="balance"]').clear().type(Math.random() * 2000)
  //   cy.get('input[name="amort"]').clear().type(Math.floor(Math.random() * 1000))
  //   cy.get('input[name="date_released"]').clear().type(`2023-01-01`)
  //   cy.get('input[name="maturity_date"]').clear().type(`2023-01-01`)
  //   cy.url().then((url) => {
  //     const loanId = url.split("/").pop()
  //     cy.intercept("PATCH", `http://localhost:8000/loans/${loanId}`).as("updateApiCall")
  //     cy.get('[data-cy="updateBtn"]').click()
  //     cy.wait("@updateApiCall").its("response.statusCode").should("eq", 200)
  //   })
  // })

  // it("Adds borrower", () => {
  //   cy.visit('http://localhost:3000/login')
  //   cy.get('input[name="username"]').type(testerUsername)
  //   cy.get('input[name="password"]').type(testerPassword)
  //   cy.contains("Sign In").click()
  //   cy.url().should("include", "/home")
  //   cy.get('[data-cy="borrowersLink"]').click()
  //   cy.url().should("include", "/borrowers")
  //   cy.contains("Add Borrower").click()
  //   cy.url().should("include", "/addBorrower")
  //   cy.get('input[name="firstname"]').type("Tester")
  //   cy.get('input[name="lastname"]').type("Mctester")
  //   cy.get('input[name="contactNumber"]').type("0712345678")
  //   cy.get('input[name="address"]').type("Nairobi, Kenya")
  //   cy.get('input[name="email"]').type("tester@testing.com")
  //   cy.get('input[name="username"]').type(testerUsername + Math.random())
  //   cy.intercept("POST", "http://localhost:8000/addClient").as("addClientApiCall")
  //   cy.contains("Save").click()
  //   cy.wait("@addClientApiCall").then((interception) => {
  //     expect(interception.response.statusCode).to.eq(200)
  //     client = interception.response.body.rows[0]
  //     expect(client).to.exist
  //     cy.log("Client: ", JSON.stringify(client))
  //   })
  // })

  //TODO: Test for payment functionality

  it("Edits borrower and adds loan", () => {
    let loan;
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type(testerUsername)
    cy.get('input[name="password"]').type(testerPassword)
    cy.contains("Sign In").click()
    cy.url().should("include", "/home")
    cy.get('[data-cy="borrowersLink"]').click()
    cy.url().should("include", "/borrowers")
    cy.get('[data-cy="borrowerLink-1"]').click()
    cy.url().should("include", "/Borrower/1")
    cy.contains("Add Loan").click()
    cy.url().should("include", "/addLoan")
    cy.get('select[name="type"]').select(1)
    cy.get('input[name="gross_loan"]').type(randomNumber % 1000)
    cy.get('input[name="balance"]').type(randomNumber % 500)
    cy.get('input[name="amort"]').type(randomNumber % 200)
    cy.get('input[name="date_released"]').clear().type(`2023-10-12T11:10:10`)
    cy.get('input[name="maturity_date"]').clear().type(`2023-01-01`)
    cy.get('select[name="terms"]').select(1)
    cy.intercept("POST", `http://localhost:8000/loans/1`).as("addLoanApiCall")
    cy.contains("Add New Loan").click()
    cy.wait("@addLoanApiCall").then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      loan = interception.response.body
      expect(loan).to.exist
      cy.url().should("include", "/Borrower/1")
      cy.get(`[data-cy="editLoanLink-${loan.id}"]`).click()
      cy.url().should("include", "/editLoan")
    })

  })
})