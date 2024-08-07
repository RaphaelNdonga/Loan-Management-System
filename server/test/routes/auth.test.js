import jwt from "jsonwebtoken"
import request from "supertest"
describe("Auth routes test", function () {
    const testUrl = "http://localhost:8000"
    let token;
    let user;
    test("register endpoint 200 (ok)", function (done) {
        const user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester01",
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
    test("register duplicate is 401(Unauthorised)", function (done) {
        const user = {
            firstname: "Tester",
            lastname: "McTester",
            contactNumber: "123456789",
            address: "Testing environment",
            email: "tester@test.com",
            username: "tester01",
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
                console.log(res.body)
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
                user = res.body
                return done()
            })
    })
    test("deletes admin", function (done) {
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
})