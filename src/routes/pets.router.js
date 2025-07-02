const express = require("express");
const router = express.Router();
//const uploader =  require("../utils/uploader.js");
const PetController = require("../controllers/PetManagerController.js");

router.get('/', async (request, response) => await PetController.getAllPets(request, response));
router.get('/:pid', async (request, response) => await PetController.getPetById(request, response));
router.post('/', async (request, response) => await PetController.createPet(request, response));
router.put('/:pid', async (request, response) => await PetController.updatePetById(request, response));
router.delete('/:pid', async (request, response) => await PetController.deletePetById(request, response));

module.exports = router;