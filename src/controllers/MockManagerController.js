const MockUtils = require("../utils/Mock.js");
const UserManager = require("../Managers/UserManager.js");
const PetManager = require("../Managers/PetManager.js");

class MockManagerController {

    // Public Methods

    static async mockUsers(request, response) {
        try {
            let { count } = request.query;

            if(!count) {
                count = 0;
            }

            if(count > 100) {
                count = 100;
            }
            
            const users = await MockUtils.mockUsers(count);

            return response.status(200).json({Status: "Success", Payload: users });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status:"Error", Message: `${error}`});
        }
    }

    static async mockPets(request, response) {
        try {
            let { count } = request.query;

            if(!count) {
                count = 0;
            }

            if(count > 100) {
                count = 100;
            }

            const pets = await MockUtils.mockPets(count);

            return response.status(200).json({Status: "Success", Payload: pets });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status:"Error", Message: `${error}`});
        }
    }

    static async generateData(request, response) {
        try {
            const { user_count, pet_count } = request.query;

            if(!user_count || !pet_count) {
                return response.status(400).json({Status: "Error", Message: "Error with the query from query params. Both, user and pet count are required"});
            }

            if(user_count > 100) {
                user_count = 100;
            }

            if(pet_count > 100) {
                pet_count = 100;
            }
        
            const users = await MockUtils.mockUsers(user_count);
            const pets = await MockUtils.mockPets(pet_count);

            for(let user of users) {
                await UserManager.createUser(user);
            }

            for(let pet of pets) {
                await PetManager.createPet(pet);
            }

            return response.status(201).json({Status: "Success", Message: "Data generated successfully"});
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status:"Error", Message: `${error}`});
        }
    }
}

module.exports = MockManagerController;

