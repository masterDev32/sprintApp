const mongo = require('mongoose');

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