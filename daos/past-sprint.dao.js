const mongo = require('mongoose');
/**
 * @swagger
 * definitions:
 *   Past-Sprints:
 *     type: object
 *     required:
 *       - idUser
 *       - date
 *       - description
 *       - length(sprint name and duration)
 *       - status
 *       - start
 *       - finish
 *     properties:
 *       idUser:
 *         type: string
 *       date:
 *         type: Date        
 *       description:
 *         type: string
 *       length:
 *         type: string
 *       status:
 *         type: string
 *       start:
 *         type: Date
 *       finish:
 *         type: Date
 */
const sprintSchema = mongo.Schema({
    idUser: String,
    length: String,
    status: String,
    date:   Date,
    start:   Date,
    finish:   Date,
    description:   String,
});

const pastSprintDAO = mongo.model('sprint', sprintSchema,'sprint');

module.exports = pastSprintDAO;