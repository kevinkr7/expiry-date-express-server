const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expiry Date Manager API',
            version: '1.0.0',
            description: 'REST API documentation for the Expiry Date Manager application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5001}`,
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'jwtToken',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger UI available at http://localhost:${process.env.PORT || 5001}/api-docs`);
};

module.exports = setupSwagger;
