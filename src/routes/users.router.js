const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserManagerController.js");

router.get('/', async (request, response) => await UserController.getAllUsers(request, response));
router.get('/:uid', async (request, response) => await UserController.getUserById(request, response));
router.post('/', async (request, response) => await UserController.createUser(request, response));
router.put('/:uid', async (request, response) => await UserController.updateUserById(request, response));
router.delete('/:uid', async (request, response) => await UserController.deleteUserById(request, response));


module.exports = router;