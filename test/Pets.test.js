export function petTests(expect, requester) {

    describe("Pets endpoints", () => {

        let pid;

        it("POST /api/pets/ - Must create a new pet", async () => {
            const pet = {
                name: "pet name",
                specie: "dog",
                birthDate: "01-01-2000"
            };

            const { _body, status } = await requester.post("/api/pets").send(pet);
        
            pid = _body.Payload._id;

            expect(status).to.equal(201);
            expect(_body.Status).to.equal("Success");
        })
            
        it("GET /api/pets - Must return an array with all pets", async () => {
            const { status, ok, _body } = await requester.get("/api/pets");
            expect(status).to.equal(200);
        })

        it("GET /api/pets/:pid - Must return an existing pet by id", async () => {
            const { status, ok, _body } = await requester.get(`/api/pets/${pid}`);
            expect(status).to.equal(200);
            expect(_body.Payload._id).to.equal(pid);
        })

        it("PUT /api/pets/:pid - Must update an existing pet by id", async () => {
            const example = {
                name: "pet name updated",
                specie: "dog",
                birthDate: "01-01-2000"
            }

            const { status, ok, _body } = await requester.put(`/api/pets/${pid}`).send(example);

            expect(status).to.equal(200);
            expect(_body.Status).to.equal("Success");
            expect(_body.Message).to.equal(`Pet with id '${pid}' updated successfully`);
        })

        it("DELETE /api/pets/:pid - Must delete an existing pet by id", async () => {
            const { status, _body } = await requester.delete(`/api/pets/${pid}`);
            expect(status).to.equal(200);
            expect(_body.Status).to.equal("Success");
            expect(_body.Message).to.equal("Pet deleted successfully");
        })
    })
}
