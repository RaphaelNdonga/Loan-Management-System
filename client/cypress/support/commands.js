// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerTester', () => {
    let randomNumber = Math.floor(Math.random() * 10000000000000) + 1
    let testerUsername = `tester${randomNumber}`
    cy.session("get_user_details", async () => {
        console.log("inside cysession")
        const test_user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: testerUsername,
            password: "password",
        }
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/register',
            body: test_user
        }).then((response) => {
            expect(response.status).to.eq(200);

            const token = response.body["token"];
            console.log("cysession token: ", token)
            Cypress.env('token', token);
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/profile',
                headers: {
                    'Authorization': `${token}`
                }
            }).then((profile) => {
                console.log("cysession profile: ", profile)
                Cypress.env('userId', profile.id)
            })
        })
    });
});