const express = require("express");
const router = express.Router();

const userRouter = require("./users.router");
const petRouter = require("./pets.router");
const adoptionRouter = require("./adoption.router");
const sessionRouter = require("./sessions.router");
const mockRouter = require("./mocks.router");

router.use('/users',userRouter);
router.use('/pets',petRouter);
router.use('/adoptions',adoptionRouter);
router.use('/sessions',sessionRouter);
router.use('/mocks', mockRouter);

module.exports = router;