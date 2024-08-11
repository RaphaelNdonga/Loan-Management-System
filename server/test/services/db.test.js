import { connectDatabase } from "../../pool"

describe("Postgresql database test", function () {
    it("BTC-001 Connects to database", async function () {
        const db = connectDatabase()
        const client = await db.connect();
        try {
            const result = await client.query("SELECT NOW()")
            expect(result.rows.length).toBe(1)
        } catch (err) {
            throw (err)
        } finally {
            client.release()
            db.end()
        }
    })
})