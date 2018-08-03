var sortJsonArray = require('sort-json-array');
const express = require('express');
const bodyParser = require('body-parser');
const sprintPastDAO = require('./daos/past-sprint.dao')
require('./config/configDB')

/**
 * server Info
 */
const Server = {
  Address: 'localhost',
  Port: process.env.PORT || 3000
}

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
 * get all Sprint
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
 * save sprint
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
    }
})

/**
 * delete sprint
 */
app.delete('/api/deleteSprint/:id', function(req,res){
  id = req.params.id;

  sprintPastDAO.remove({idUser: id}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data)
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

/**
 * set Port
 */

app.listen(Server.Port, function() {
  console.log('Server running on port 3000...');
});
