const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const options = {
    swaggerDefinition: {
        info: {
            title: 'Angular Sprint Project', 
            version: '1.0.0', 
        },
    },
    apis: ['./config/*.js', './routes/*.js', './daos/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/**
   * @swagger
   * securityDefinitions:
   *   api_key:
   *     type: apiKey
   *     name: Authorization
   *     in: header
*/

module.exports = router;