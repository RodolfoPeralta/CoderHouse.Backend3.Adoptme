const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionManagerController.js");
const JwtUtils = require("../utils/Jwt.js");

router.post('/register', async (request, response) => await SessionController.register(request, response));
router.post('/login', async (request, response) => await SessionController.login(request, response));
router.get('/current', JwtUtils.authorizeToken, async (request, response) => await SessionController.current(request, response));


module.exports = router;