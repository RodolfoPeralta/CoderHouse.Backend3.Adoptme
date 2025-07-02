const express = require('express');
const apiRouter = require("./routes/index.js");
const mongoConnection = require("./config/mongo/mongo.js");
const configureMiddlewares = require("./config/middlewares/middlewares.js");
const dotenv = require("dotenv");
const configureSwagger = require('./config/swagger/swagger.js');
dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO;

// MongoDB connection
mongoConnection(MONGO_URL);

// Middlewares
configureMiddlewares(app);

// Routes
app.use("/api", apiRouter);

// Swagger
configureSwagger(app);

module.exports = app;

