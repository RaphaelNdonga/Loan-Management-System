import request from "supertest"

describe("Loans functionality test", function () {
    const testUrl = "http://localhost:8000"
    let adminUser
    let token
    let mainLoan
    let mainLoan2
    let mainPayment
    let mainPayment2

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

    test("BTC-016 Adds loan without id in route parameter", function (done) {
        const loan = {
            amort: "1500.00",
            balance: "6000.00",
            client_id: 1,
            date_released: "2024-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: "2024-03-03T21:00:00.000Z",
            status: "Pending",
            terms: 1,
            type: "Personal Loan"
        }
        request(testUrl)
            .post("/loans")
            .send(loan)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /loans: ", err)
                    return done(err)
                }
                expect(res.body).toBeTruthy()
                mainLoan = res.body
                return done()
            })
    })
    test("BTC-004 NOT vulnerable to SQL injection when adding loan without id", function (done) {
        const SQL = "2024-02-04T02:30:01.000Z');--"
        const loan = {
            amort: "1500.00",
            balance: "6000.00",
            client_id: 1,
            date_released: "2024-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: SQL,
            status: "Pending",
            terms: 1,
            type: "Personal Loan"
        }
        request(testUrl)
            .post("/loans")
            .send(loan)
            .set("Authorization", token)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /loans: ", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-016 Adds loan with id in route parameter", function (done) {
        const loan = {
            amort: "3500.00",
            balance: "7000.00",
            client_id: 1,
            date_released: "2022-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: "2025-03-03T21:00:00.000Z",
            status: "Pending",
            terms: 1,
            type: "Personal Loan"
        }
        request(testUrl)
            .post(`/loans/${1}`)
            .send(loan)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /loans: ", err)
                    return done(err)
                }
                expect(res.body).toBeTruthy()
                mainLoan2 = res.body
                return done()
            })
    })
    test("BTC-004 NOT vulnerable to SQL injection when adding loan with id", function (done) {
        const SQL = "2024-02-04T02:30:01.000Z');--"
        const loan = {
            amort: "3500.00",
            balance: "7000.00",
            client_id: 1,
            date_released: "2022-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: SQL,
            status: "Pending",
            terms: 1,
            type: "Personal Loan"
        }
        request(testUrl)
            .post(`/loans/${1}`)
            .send(loan)
            .set("Authorization", token)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in /loans: ", err)
                    return done(err)
                }
                return done()
            })
    })
    test("BTC-017 Gets all loans", function (done) {
        request(testUrl)
            .get("/allLoans")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in GET /allLoans: ", err)
                    return done(err)
                }
                console.log(res.body)
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("BTC-018 Get loans of one client", function (done) {
        request(testUrl)
            .get(`/loans/${mainLoan.client_id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get /loans/:id ", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("BTC-019 Get one loan from client", function (done) {
        request(testUrl)
            .get(`/loan/${mainLoan.client_id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get /loan/:id ", err)
                    return done(err)
                }
                expect(res.body).toBeTruthy()
                return done()
            })
    })

    test("BTC-020 Get loan maturity date", function (done) {
        request(testUrl)
            .get(`/dates`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get /dates", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("BTC-021 Update loan", function (done) {
        const loan = {
            amort: "15000.00",
            balance: "60000.00",
            client_id: 1,
            date_released: "2024-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: "2024-03-03T21:00:00.000Z",
            status: "Pending",
            terms: 1,
            type: "Personal Loan"
        }
        request(testUrl)
            .patch(`/loans/${mainLoan.id}`)
            .send(loan)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in patch /loans/:id ", err)
                    return done(err)
                }
                expect(res.body[0].balance).toBe(loan.balance)
                expect(res.body[0].amort).toBe(loan.amort)
                return done()
            })
    })
    test("BTC-004 NOT vulnerable to SQL injection when updating loan", function (done) {
        const SQL = "inject';--"
        const loan = {
            amort: "15000.00",
            balance: "60000.00",
            client_id: 1,
            date_released: "2024-02-04T02:30:01.000Z",
            firstname: "Elon",
            gross_loan: "5000.00",
            maturity_date: "2024-03-03T21:00:00.000Z",
            status: "Pending",
            terms: 1,
            type: SQL
        }
        request(testUrl)
            .patch(`/loans/${mainLoan.id}`)
            .send(loan)
            .set("Authorization", token)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in patch /loans/:id ", err)
                    return done(err)
                }
                return done()
            })
    })
    test("BTC-022 Update loan payment", function (done) {
        request(testUrl)
            .patch(`/loan/${mainLoan.id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in patch /loans/:id ", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-023 Create payment for a single loan", function (done) {
        const payment = {
            amount: '200',
            collection_date: '2024-08-08',
            collected_by: 'some date',
            new_balance: 4800,
            method: '',
            client_id: '1'
        }
        request(testUrl)
            .post(`/payments/${mainLoan.id}`)
            .send(payment)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in post /payments/:id", err)
                    return done(err)
                }
                mainPayment = res.body
                expect(mainPayment).toBeTruthy()
                return done()
            })
    })

    test("BTC-004 NOT vulnerable to SQl injection when creating payment for a single loan", function (done) {
        const SQL = "1,1);--"
        const payment = {
            amount: '200',
            collection_date: '2024-08-08',
            collected_by: 'some date',
            new_balance: 4800,
            method: '',
            client_id: SQL
        }
        request(testUrl)
            .post(`/payments/${mainLoan.id}`)
            .send(payment)
            .set("Authorization", token)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in post /payments/:id", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-024 Gets client payments to a single loan", function (done) {
        request(testUrl)
            .get(`/payments/${mainPayment.client_id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get /payments/:id", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("BTC-025 Get all payments", function (done) {
        request(testUrl)
            .get("/allPayments")
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in get /allPayments", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })
    test("BTC-026 Get payment with client id and loan id", function (done) {
        request(testUrl)
            .get(`/payment/${mainPayment.client_id}/${mainPayment.loan_id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("ERror in get /payment/:client_id/:loan_id", err)
                    return done(err)
                }
                expect(res.body.length).toBeGreaterThan(0)
                return done()
            })
    })

    test("BTC-027 Delete payment for loan", function (done) {
        request(testUrl)
            .delete(`/payment/${mainPayment.id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /payment/:id", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-028 Deletes loan without id in route parameter", function (done) {
        request(testUrl)
            .delete(`/loans/${mainLoan.id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /loans", err)
                    return done(err)
                }
                return done()
            })
    })

    test("BTC-028 Deletes loan with id in route parameter", function (done) {
        request(testUrl)
            .delete(`/loans/${mainLoan2.id}`)
            .set("Authorization", token)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("Error in delete /loans", err)
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