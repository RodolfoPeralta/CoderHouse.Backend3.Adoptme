const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
require("dotenv").config();

const PORT = process.env.PORT;

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Adoptme",
            description: "Adoptme API documentation"
        },
        servers: [
        {
            url: `http://localhost:${PORT}`
        }
    ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

function configureSwagger(app) {
    const specs= swaggerJSDoc(swaggerOptions);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
}

module.exports = configureSwagger;