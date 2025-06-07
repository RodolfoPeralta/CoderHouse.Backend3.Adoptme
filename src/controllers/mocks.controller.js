import mockUtils from "../utils/mock.js";
import { usersService } from "../services/index.js";
import { petsService } from "../services/index.js";

import dotenv from "dotenv";
dotenv.config();

const mockUsers = async (req, res) => {
    try {
        const quantity = process.env.MOCK_USERS_QUANTITY;

        const users = await mockUtils.mockUsers(quantity);

        return res.status(200).json({Status: "Success", Payload: users });
    }
    catch(error) {
        return res.status(500).json({Status:"Error", Message: `${error}`});
    }
}

const mockPets = async (req, res) => {
    try {
        const quantity = process.env.MOCK_PETS_QUANTITY;

        const pets = await mockUtils.mockPets(quantity);

        return res.status(200).json({Status: "Success", Payload: pets });
    }
    catch(error) {
        res.locals.message = error;
        return res.status(500).json({Status:"Error", Message: `${error}`});
    }
}

const generateData = async (req, res) => {
    try {
        const userQuantity = process.env.MOCK_USERS_QUANTITY;
        const petQuantity = process.env.MOCK_PETS_QUANTITY;

        const users = await mockUtils.mockUsers(userQuantity);
        const pets = await mockUtils.mockPets(petQuantity);

        for(let user of users) {
            await usersService.create(user);
        }

        for(let pet of pets) {
            await petsService.create(pet);
        }

        return res.status(201).json({Status: "Success", Message: "Data generated successfully"});
    }
    catch(error) {
        res.locals.message = error;
        return res.status(500).json({Status:"Error", Message: `${error}`});
    }
}

export default {
    mockUsers,
    mockPets,
    generateData
}