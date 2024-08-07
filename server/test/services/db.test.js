import { connectDatabase } from "../../pool"

describe("Postgresql database test", function () {
    afterAll(async () => {
        await connectDatabase().end()
    })
    it("should connect to database", async function () {
        const client = await connectDatabase().connect();
        try {
            const result = await client.query("SELECT NOW()")
            expect(result.rows.length).toBe(1)
        } catch (err) {
            throw (err)
        } finally {
            client.release()
        }
    })
})