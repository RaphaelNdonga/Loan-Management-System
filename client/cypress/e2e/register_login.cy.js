describe('Register and Login functionality', () => {
  let randomNumber = Math.floor(Math.random() * 10000000000000) + 1
  let testerUsername = `tester${randomNumber}`
  let testerPassword = "password"
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

  it("Edits Loans", () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type(testerUsername)
    cy.get('input[name="password"]').type(testerPassword)
    cy.contains("Sign In").click()
    cy.url().should("include", "/home")
    cy.get('[data-cy="viewBtn"]').should("exist").click()
    cy.url().should("include", "/editLoan")
    cy.get('select[name="type"]').select(randomNumber % 3)
    cy.get('select[name="terms"]').select(randomNumber % 7)
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
})