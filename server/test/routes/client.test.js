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
    test("BTC-010 Adds client", function (done) {
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

    test("BTC-004 /addClient is NOT vulnerable to SQL injection", function (done) {
        const SQL = "' OR '1'='1'--"
        const test_user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: SQL,
            password: "password",
        }
        request(testUrl)
            .post("/addClient")
            .send(test_user)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /login", err)
                    return done(err)
                }
                return done()
            })

    })

    test("BTC-011 Gets all clients", function (done) {
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

    test("BTC-012 Gets client through id", function (done) {
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

    test("BTC-013 Gets client through email", function (done) {
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


    test("BTC-014 Updates client data", function (done) {
        const testUser = {
            firstname: "Testerx",
            lastname: "McTesterx",
            contactNumber: "123456780",
            address: "Testing environment",
            email: "testerx@testx.com",
            username: "tester01x",
            password: "password",
        }

        request(testUrl)
            .patch(`/clients/${client.id}`)
            .send(testUser)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error PATCH /clients/:id")
                    return done(err)
                }
                expect(res.body[0]["firstname"]).toBe("Testerx")
                return done()
            })
    })

    test("BTC-004 Updates client is NOT vulnerable to SQL injection", function (done) {
        const SQL = "inject';--"
        const testUser = {
            firstname: SQL,
            lastname: "McTesterx",
            contactNumber: "123456780",
            address: "Testing environment",
            email: "testerx@testx.com",
            username: "tester01x",
            password: "password",
        }

        request(testUrl)
            .patch(`/clients/${client.id}`)
            .send(testUser)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error PATCH /clients/:id")
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-015 Deletes client", function (done) {
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