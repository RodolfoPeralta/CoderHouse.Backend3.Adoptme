const MongoDbService = require("../services/MongoDbService");
const Pet = require("../models/Pet");

class PetManager {

    // Public Methods

    static async getAllPets() {
        try {
            return await MongoDbService.getAll(Pet);
        }
        catch(error) {
            throw error;
        }
    }

    static async getPetById(pid) {
        try {
            return await MongoDbService.getById(Pet, pid);
        }
        catch(error) {
            throw error;
        }
    }

    static async createPet(pet) {
        try {
            return await MongoDbService.createOne(Pet, pet);
        }
        catch(error) {
            throw error;
        }
    }

    static async updatePetById(pid, pet) {
        try {
            return await MongoDbService.updateById(Pet, pet, pid);
        }
        catch(error) {
            throw error;
        }
    }

    static async deletePetById(pid) {
        try {
            return await MongoDbService.deleteById(Pet, pid);
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = PetManager;