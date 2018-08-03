const mongo = require('mongoose')
/**
 * DB info
 */
const DB = {
    Adress: 'localhost',
    Name: 'SprintDB',
    Port: 27017
  }
  
  /**
   * connect to DB.
   */
  mongo.connect(
    `mongodb://${DB.Adress}:${DB.Port}/${DB.Name}`,
    { useNewUrlParser: true },
    function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to mongo');
      }
    }
  );
  