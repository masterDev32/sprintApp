var sortJsonArray = require('sort-json-array');
const express = require('express');
const bodyParser = require('body-parser');
const sprintPastDAO = require('../daos/past-sprint.dao')
var app = express();
/**
 * BodyParser Middleware
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * give access to angular App.
 */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


/**
   * @swagger
   * /api/getSprints/{userID}:
   *   get:
   *     tags:
   *      - User Past-sprints
   *     parameters:
   *       - name: userID
   *         description: Auth0 User id
   *         in: path
   *         required: true
   *         type: string
   *     description: Get all past sprint related to this user
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: return data
   *         schema:
   *           type: object
   *           properties:
   *             data:
   *                 $ref: '#/definitions/Past-Sprints'
   *       400:
   *         description: error
   *     security:
   *      - api_key: []  
   */
app.get('/api/getSprints/:id', function(req, res) {
  id = req.params.id;
  sprintPastDAO.find({idUser: id}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

/**
   * @swagger
   * /api/saveSprint:
   *   post:
   *     tags:
   *      - User Past-sprints
   *     parameters:
   *       - name: Sprint
   *         description: New Sprint
   *         in: body
   *         required: true
   *         schema: 
   *                $ref: '#/definitions/Past-Sprints'
   *     description: create a new past-sprint and save in DB.
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: inserted
   *         schema:
   *           type: object
   *           properties:
   *             data:
   *                 $ref: '#/definitions/Past-Sprints'
   *       400:
   *         description: failed
   *     security:
   *      - api_key: []  
   */
app.post("/api/saveSprint", function(req,res){
    data = req.body;
    /**
     * insert document
     */
    try{
      sprintPastDAO.create(data);
      res.send({data:"inserted"});  
    } catch(error){
      console.log(error);
      res.send({data:"failed"});
    }
})

/**
   * @swagger
   * /api/deleteSprint/{userID}:
   *   delete:
   *     tags:
   *      - User Past-sprints
   *     parameters:
   *       - name: userID
   *         description: Auth0 User id
   *         in: path
   *         required: true
   *         type: string
   *     description: Remove all past sprint related to this user
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: deleted
   *         schema:
   *           type: object
   *           properties:
   *             data:
   *                 $ref: '#/definitions/Past-Sprints'
   *       400:
   *         description: failed
   *     security:
   *      - api_key: []  
   */
app.delete('/api/deleteSprint/:id', function(req,res){
  id = req.params.id;

  sprintPastDAO.remove({idUser: id}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({data:"deleted"})
      }
  });
  
})

/**
 * sorting table
 */
app.get("/api/sort/:name/:id", function(req,res){
  id = req.params.id;
  name = req.params.name;
  sprintPastDAO.find({idUser: id}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({data:sortJsonArray(data,''+name,'asc')}); 
    }
  });
})

module.exports = app