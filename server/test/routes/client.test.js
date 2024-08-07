import request from "supertest"
describe("Client functionality test", function () {
    const testUrl = "http://localhost:8000"
    let client
    let token

    test("Adds client", function (done) {
        const testUser = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester01",
            password: "password",
        }

        request(testUrl)
            .post("/addClient")
            .send(testUser)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /addClient", err)
                    return done(err)
                }
                client = res.body.rows[0]
                console.log("Client", client)
                return done()
            })
    })
    test("Deletes client", function (done) {
        request(testUrl)
            .delete(`/clients/${client.id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error deleting client", err)
                    return done(err)
                }
                return done()
            })
    })

})