import jwt from 'jsonwebtoken';
import { describe, expect, test } from '@jest/globals'
import { generateJWT } from "../../utils/jwtGenerator"

describe("Auth test", function () {
    test("generates token", function () {
        const user = { name: "tester", password: "password" }
        const token = generateJWT(user)
        expect(token).toBeTruthy()
    })
    test("generates valid token", function () {
        const user = { name: "tester", password: "password" }
        const token = generateJWT(user)
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verifiedUser)
        expect(verifiedUser.name).toBe("tester")
        expect(verifiedUser.password).toBe("password")
    })
})