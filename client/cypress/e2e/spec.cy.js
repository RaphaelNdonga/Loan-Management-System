describe('template spec', () => {
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

  it('Logs in', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type(testerUsername)
    cy.get('input[name="password"]').type(testerPassword)
    cy.intercept("POST", "http://localhost:8000/login").as("loginApiCall")
    cy.contains("Sign In").click()
    cy.wait("@loginApiCall").its("response.statusCode").should("eq", 200)
    cy.url().should("include", "/home")
  })
})