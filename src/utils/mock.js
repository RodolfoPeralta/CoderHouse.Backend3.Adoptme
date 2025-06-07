import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../utils/bcrypt.js";

const mockPets = async (quantity) => {
    try {
        let pets = [];

        for(let i=0; i < quantity; i++) {
            const pet = {
                name: faker.person.firstName(),
                specie: faker.animal.type(),
                birthDate: faker.date.between({from: "2005-01-01", to: "2024-01-01"}),
                adopted: false
            }

            pets.push(pet);
        }

        return pets;
    }
    catch(error) {
        throw(`Error when trying to mock pets. Message: ${error}`);
    }
}

const mockUsers = async (quantity) => {
    try {

        let users = [];

        for(let i=0; i < quantity; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: createHash("coder123"),
                role: faker.helpers.arrayElement(["admin", "user"]),
                pets: []
            }

            users.push(user);
        }

        return users;
    }
    catch(error) {
        throw(`Error when trying to mock users. Message: ${error}`);
    }
}

export default {
    mockPets,
    mockUsers
}