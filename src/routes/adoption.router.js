const express = require("express");
const router = express.Router();
const AdoptionController = require("../controllers/AdoptionManagerController.js");

router.get('/', async (request, response) => await AdoptionController.getAllAdoptions(request, response));
router.get('/:aid', async (request, response) => await AdoptionController.getAdoptionById(request, response));
router.post('/user/:uid/pet/:pid', async (request, response) => await AdoptionController.createAdoption(request, response));

module.exports = router;