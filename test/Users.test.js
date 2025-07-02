export function userTests(expect, requester) {

    describe("Users endpoints", () => {

        let uid;

        it("POST /api/users/ - Must create a new user", async () => {
            const user = {
                first_name: "coder",
                last_name: "house",
                email: "coderhouse@email.com",
                password: "123456"
            };

            const { _body } = await requester.post("/api/users").send(user);

            uid = _body.Payload._id;
        })
            
        it("GET /api/users - Must return an array with all users", async () => {
            const { status, ok, _body } = await requester.get("/api/users");
            expect(status).to.equal(200);
        })

        it("GET /api/users/:uid - Must return an existing user by id", async () => {
            const { status, ok, _body } = await requester.get(`/api/users/${uid}`);
            expect(status).to.equal(200);
            expect(_body.Payload._id).to.equal(uid);
        })

        it("PUT /api/users/:uid - Must update an existing user", async () => {
            const example = {
                first_name: "coder",
                last_name: "house updated",
                email: "coderhouse@email.com",
                password: "12345678910"
            }

            const { status, ok, _body } = await requester.put(`/api/users/${uid}`).send(example);

            expect(status).to.equal(200);
            expect(_body.Status).to.equal("Success");
            expect(_body.Message).to.equal("User updated successfully");
        })

        it("DELETE /api/users/:uid - Must delete an existing user by id", async () => {
            const { status, _body } = await requester.delete(`/api/users/${uid}`);
            expect(status).to.equal(200);
            expect(_body.Status).to.equal("Success");
            expect(_body.Message).to.equal("User deleted successfully");
        })
    })
}

