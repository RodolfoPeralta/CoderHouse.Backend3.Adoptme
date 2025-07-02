const express = require("express");
const router = express.Router();
const MockController = require("../controllers/MockManagerController.js");

router.get("/mockingusers", async (request, response) => await MockController.mockUsers(request, response));
router.get("/mockingpets", async (request, response) => await MockController.mockPets(request, response));
router.post("/generateData", async (request, response) => await MockController.generateData(request, response));

module.exports = router;