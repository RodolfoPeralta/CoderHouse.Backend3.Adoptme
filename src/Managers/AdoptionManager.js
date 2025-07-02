const MongoDbService = require("../services/MongoDbService");
const Adoption = require("../models/Adoption");

class AdoptionManager {

    // Public Methods

    static async getAllAdoptions() {
        try {
            return await MongoDbService.getAll(Adoption);
        }
        catch(error) {
            throw error;
        }
    }

    static async getAdoptionById(aid) {
        try {
            return await MongoDbService.getById(Adoption, aid);
        }
        catch(error) {
            throw error;
        }
    }

    static async createAdoption(adoption) {
        try {
            return await MongoDbService.createOne(Adoption, adoption);
        }
        catch(error) {
            throw error;
        }
    }

    static async updateAdoptionById(aid, adoption) {
        try {
            return await MongoDbService.updateById(Adoption, adoption, aid);
        }
        catch(error) {
            throw error;
        }
    }

    static async deleteAdoptionById(aid) {
        try {
            return await MongoDbService.deleteById(Adoption, aid);
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = AdoptionManager;