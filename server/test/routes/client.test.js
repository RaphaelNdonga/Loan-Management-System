import request from "supertest"
describe("Client functionality test", function () {
    const testUrl = "http://localhost:8000"
    let client
    let adminUser
    let token

    test("register endpoint 200 (ok)", function (done) {
        const user = {
            firstname: "ClientTester",
            lastname: "McClient",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "clientester@test.com",
            username: "clienttester01",
            password: "password",
        }
        request(testUrl)
            .post("/register")
            .send(user)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /register", err)
                    return done(err)
                }
                token = res.body["token"]
                return done()
            })
    })
    test("gets profile", function (done) {
        request(testUrl)
            .get("/profile")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /profile", err)
                    return done(err)
                }
                adminUser = res.body
                return done()
            })
    })
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

    test("Gets all clients", function (done) {
        console.log("Token: ", token)
        request(testUrl)
            .get("/allClients")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error get /allClients", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("Gets client through id", function (done) {
        request(testUrl)
            .get(`/client/${client.id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error get /client/:id", err)
                    return done(err)
                }
                expect(res.body.id).toBe(client.id)
                return done()
            })
    })

    test("Gets client through email", function (done) {
        request(testUrl)
            .get(`/email/${client.email}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error GET /email/:email")
                    return done(err)
                }
                expect(res.body.id).toBe(client.id)
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

    test("deletes admin", function (done) {
        request(testUrl)
            .delete(`/admin/${adminUser.id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /admin/:id", err)
                    return done(err)
                }
                console.log("deleted id: ", adminUser.id)
                return done()
            })
    })
})