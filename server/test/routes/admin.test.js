import jwt from "jsonwebtoken"
import request from "supertest"
describe("Admin functionality test", function () {
    const testUrl = "http://localhost:8000"
    let token;
    let user;
    test("BTC-003 register endpoint 200 (ok)", function (done) {
        const user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester02",
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
    test("BTC-003 register duplicate is 401(Unauthorised)", function (done) {
        const user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester02",
            password: "password",
        }
        request(testUrl)
            .post("/register")
            .send(user)
            .expect(401)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /register", err)
                    return done(err)
                }
                return done()
            })
    })
    test("BTC-004 register is NOT vulnerable to SQL injection", function (done) {
        const SQL = "' OR '1'='1'--"
        const user = {
            username: SQL,
            password: "password"
        }
        request(testUrl)
            .post("/login")
            .send(user)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /login", err)
                    return done(err)
                }
                return done()
            })

    })
    test("BTC-005 login", function (done) {
        const user = {
            username: "tester01",
            password: "password"
        }
        request(testUrl)
            .post("/login")
            .send(user)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /login", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-004 login is NOT vulnerable to SQL injection", function (done) {
        const SQL = "' OR '1'='1'--"
        const user = {
            username: SQL,
            password: "password"
        }
        request(testUrl)
            .post("/login")
            .send(user)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /login", err)
                    return done(err)
                }
                return done()
            })

    })
    test("BTC-006 gets profile", function (done) {
        request(testUrl)
            .get("/profile")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /profile", err)
                    return done(err)
                }
                user = res.body
                return done()
            })
    })
    test("BTC-007 gets all admins", function (done) {
        request(testUrl)
            .get("/allAdmins")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /allAdmins", err)
                    return done(err)
                }
                return done()
            })
    })
    test("BTC-008 deletes admin", function (done) {
        request(testUrl)
            .delete(`/admin/${user.id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /client/:id", err)
                    return done(err)
                }
                console.log("deleted id: ", user.id)
                return done()
            })
    })
    test("BTC-009 adds admin", function (done) {
        const test_user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester02",
            password: "password",
        }
        request(testUrl)
            .post("/addAdmin")
            .send(test_user)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /addAdmin", err)
                    return done(err)
                }
                token = res.body["token"]
                return done()
            })
    })
    test("BTC-004 /addAdmin is NOT vulnerable to SQL injection", function (done) {
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
            .post("/addAdmin")
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
    test("deletes added admin", function (done) {
        request(testUrl)
            .delete(`/admin/${user.id + 1}`)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /client/:id", err)
                    return done(err)
                }
                console.log("deleted id: ", user.id)
                return done()
            })
    })
})