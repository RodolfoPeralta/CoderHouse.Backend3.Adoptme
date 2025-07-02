const PetManager = require("../Managers/PetManager");
const PetDto = require("../dto/Pet.dto");

class PetManagerController {

    // Public Methods

    static async getAllPets(request, response) {
        try {
            const pets = await PetManager.getAllPets();

            if(pets) {
                return response.status(200).json({Status: "Success", Payload: pets });
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async getPetById(request, response) {
        try {
            const pid = request.params.pid;

            if(!pid) {
                response.locals.message = "Pet id is required";
                return response.status(400).json({Status: "Error", Message: "Pet id is required"});
            }

            const pet = await PetManager.getPetById(pid);

            if(!pet) {
                response.locals.message = `Pet with id '${pid}' not found`;
                return response.status(404).json({Status: "Error", Message: `Pet with id '${pid}' not found`});
            }

            return response.status(200).json({Status: "Success", Payload: pet});
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async createPet(request, response) {
        try {
            const { name, specie, birthDate } = request.body || {};

            if(!name) {
                response.locals.message = "Pet name is required";
                return response.status(400).json({Status: "Error", Message: "Pet name is required"});
            }

            if(!specie) {
                response.locals.message = "Pet specie is required";
                return response.status(400).json({Status: "Error", Message: "Pet specie is required"});
            }

            if(!birthDate) {
                response.locals.message = "Pet birthDate is required";
                return response.status(400).json({Status: "Error", Message: "Pet birthDate is required"});
            }

            const pet = {
                name,
                specie,
                birthDate
            }

            const petDto = PetDto.getPetDto(pet);

            const newPet = await PetManager.createPet(petDto);

            return response.status(201).json({Status: "Success", Payload: newPet });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async updatePetById(request, response) {
        try {
            const pid = request.params.pid;

            if(!pid) {
                response.locals.message = "Pet id is required";
                return response.status(400).json({Status: "Error", Message: "Pet id is required"});
            }

            const { name, specie, birthDate } = request.body || {};

            if(!name) {
                response.locals.message = "Pet name is required";
                return response.status(400).json({Status: "Error", Message: "Pet name is required"});
            }

            if(!specie) {
                response.locals.message = "Pet specie is required";
                return response.status(400).json({Status: "Error", Message: "Pet specie is required"});
            }

            if(!birthDate) {
                response.locals.message = "Pet birthDate is required";
                return response.status(400).json({Status: "Error", Message: "Pet birthDate is required"});
            }

            const pet = {
                name,
                specie,
                birthDate
            }

            if(await PetManager.updatePetById(pid, pet)) {
                response.locals.message = `Pet with id '${pid}' updated successfully`;
                return response.status(200).json({Status: "Success", Message: `Pet with id '${pid}' updated successfully`});
            }
            else {
                response.locals.message = `Pet with id '${pid}' not found`;
                return response.status(404).json({Status: "Error", Message: `Pet with id '${pid}' not found`});
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async deletePetById(request, response) {
        try {
            const pid = request.params.pid;

            if(!pid) {
                response.locals.message = "Pet id is required";
                return response.status(400).json({Status: "Error", Message: "Pet id is required"});
            }

            if(await PetManager.deletePetById(pid)) {
                response.locals.message = "Pet deleted successfully";
                return response.status(200).json({Status: "Success", Message: "Pet deleted successfully"});
            }
            else {
                response.locals.message = `Pet with id '${pid}' not found`;
                return response.status(404).json({Status: "Error", Message: `Pet with id '${pid}' not found`});
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async createPetWithImage(request, response) {
        try {
            const file = request.file;

            if(!file) {
                response.locals.message = "Pet image not found";
                return response.status(400).json({Status: "Error", Message: "Pet image not found"});
            }

            const { name, specie, birthDate } = request.body || {};

            if(!name) {
                response.locals.message = "Pet name is required";
                return response.status(400).json({Status: "Error", Message: "Pet name is required"});
            }

            if(!specie) {
                response.locals.message = "Pet specie is required";
                return response.status(400).json({Status: "Error", Message: "Pet specie is required"});
            }

            if(!birthDate) {
                response.locals.message = "Pet birthDate is required";
                return response.status(400).json({Status: "Error", Message: "Pet birthDate is required"});
            }

            const pet = {
                name,
                specie,
                birthDate,
                image:`${__dirname}/../public/img/${file.filename}`
            }

            const petDto = PetDto.getPetDto(pet);

            const newPet = await PetManager.createPet(petDto);

            return response.status(201).json({Status: "Success", Payload: newPet });

        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = PetManagerController;
