const AdoptionManager = require("../Managers/AdoptionManager.js");
const PetManager = require("../Managers/PetManager.js");
const UserManager = require("../Managers/UserManager.js");

class AdoptionManagerController {

    // Public Methods

    static async getAllAdoptions(request, response) {
        try {
            const adoptions = await AdoptionManager.getAllAdoptions();

            if(adoptions) {
                return response.status(200).json({Status: "Success", Payload: adoptions});
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async getAdoptionById(request, response) {
        try {
            const aid = request.params.aid;

            if(!aid) {
                response.locals.message = "Adoption id is required";
                return response.status(400).json({Status: "Error", Message: "Adoption id is required"});
            }

            const adoption = await AdoptionManager.getAdoptionById(aid);

            if(!adoption) {
                response.locals.message = `Adoption with id '${aid}' not found`;
                return response.status(404).json({Status: "Error", Message: `Adoption with id '${aid}' not found`});
            }

            return response.status(200).json({Status: "Success", Payload: adoption });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async createAdoption(request, response) {
        try {
            const uid = request.params.uid;
            const pid = request.params.pid;

            if(!uid) {
                response.locals.message = "User id is required";
                return response.status(400).json({Status: "Error", Message: "User id is required"});
            }

            if(!pid) {
                response.locals.message = "Pet id is required";
                return response.status(400).json({Status: "Error", Message: "Pet id is required"});
            }

            const user = await UserManager.getUserById(uid);

            if(!user) {
                response.locals.message = `User with id '${uid}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not found`});
            }

            const pet = await PetManager.getPetById(pid);

            if(!pet) {
                response.locals.message = `Pet with id '${pid}' not found`;
                return response.status(404).json({Status: "Error", Message: `Pet with id '${pid}' not found`});
            }

            if(pet.adopted) {
                response.locals.message = `Pet with id '${pid}' is already adopted`;
                return response.status(400).json({Status: "Error", Message: `Pet with id '${pid}' is already adopted`});
            }

            // Updates user
            user.pets.push(pet._id);
            await UserManager.updateUserById(uid, user);

            //Updates pet
            pet.adopted = true;
            await PetManager.updatePetById(pid, pet);

            // Creates new adoption
            
            const adoption = {
                owner: user._id,
                pet: pet._id
            }

            const newAdoption = await AdoptionManager.createAdoption(adoption);

            return response.status(201).json({Status: "Success", Payload: newAdoption });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = AdoptionManagerController;