
const swaggerJsDoc = require('swagger-jsdoc');

const opcoes = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digital Store API',
      version: '1.0.0',
      description: 'Documentação da API da Digital Store'
    },
        components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsDoc(opcoes);

module.exports = swaggerSpec;
