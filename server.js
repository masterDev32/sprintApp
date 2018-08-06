const swaggerUi = require('express-swaggerize-ui');
const configSwagger = require('./config/configSwagger')
const app = require('./routes/api.route')
require('./config/configDB')

/**
 * swagger
 */
app.use('/api-docs', swaggerUi());
app.use('/api-docs.json', configSwagger);

/**
 * server Info
 */
const Server = {
  Port: process.env.PORT || 3000
}

/**
 * set Port
 */

app.listen(Server.Port, function() {
  console.log('Server running on port 3000...');
});
