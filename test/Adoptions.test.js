export function adoptionTests(expect, requester) {
    describe("Adoptions endpoints", () => {

        let aid, pid, uid;

        before(async () => {
            
            // Creates an example user
            const user = {
                first_name: "coder",
                last_name: "house",
                email: "coderhouse@email.com",
                password: "123456"
            };

            const userResponse = await requester.post("/api/users").send(user);
            
            uid = userResponse._body.Payload._id;

            // Creates an example pet
            const pet = {
                name: "pet name",
                specie: "dog",
                birthDate: "01-01-2000"
            };

            const petResponse = await requester.post("/api/pets").send(pet);
        
            pid = petResponse._body.Payload._id;
        })


        it("POST /api/adoptions/user/:uid/pet/:pid - Must create a new adoption", async () => {
            const { status, _body } = await requester.post(`/api/adoptions/user/${uid}/pet/${pid}`);
            aid = _body.Payload._id;
            expect(status).to.equal(201);
            expect(_body.Status).to.equal("Success");
        })
            
        it("GET /api/adoptions - Must return an array with all adoptions", async () => {
            const { status, ok, _body } = await requester.get("/api/adoptions");
            expect(status).to.equal(200);
        })

        it("GET /api/adoptions/:aid - Must return an existing adoption by id", async () => {
            const { status, ok, _body } = await requester.get(`/api/adoptions/${aid}`);
            expect(status).to.equal(200);
            expect(_body.Payload).to.have.property("_id", aid);
            expect(_body.Payload.owner).to.equal(uid);
            expect(_body.Payload.pet).to.equal(pid);
        })

        // Deletes example user and pet after test
        after(async () => {
            
            const user = await requester.get(`/api/users/${uid}`);

            if(user) {
                await requester.delete(`/api/users/${uid}`);
            }
            
            const pet = await requester.get(`/api/pets/${pid}`);
            
            if(pet) {
                await requester.delete(`/api/pets/${pid}`);
            }
        })
    })
}

