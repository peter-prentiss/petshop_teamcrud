var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT owners.first_name, owners.last_name, owners.id AS ownerid, pets.id AS petid, pets.name, pets.breed, pets.color FROM "owners" ' +
                      'LEFT OUTER JOIN "pets" ON "owners"."id" = "pets"."owner_id" ' +
                      'LEFT OUTER JOIN "visits" ON "pets"."id" = "visits"."pet_id" ' +
                      'ORDER BY "owners"."last_name";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.send({arrayX: result.rows});
        }
      });
    }
  });
});

router.get('/owners', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM owners;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.send({arrayX: result.rows});
        }
      });
    }
  });
});

router.get('/visits', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "owners" ' +
                      'JOIN "pets" ON "owners"."id" = "pets"."owner_id" ' +
                      'JOIN "visits" ON "pets"."id" = "visits"."pet_id" ' +
                      'ORDER BY "visits".check_out_date", "owners"."last_name";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.send({arrayX: result.rows});
        }
      });
    }
  });
});

router.post('/owner', function(req, res) {
  var owner = req.body;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "owners" ("first_name", "last_name")' +
                      'VALUES ($1, $2);';
      db.query(queryText, [owner.firstName, owner.lastName], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.post('/pet', function(req, res) {
  var pet = req.body;
  console.log(pet);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "pets" ("name", "breed", "color", "owner_id")' +
                      'VALUES ($1, $2, $3, $4);';
      db.query(queryText, [pet.name, pet.breed, pet.color, pet.owner_id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.post('/visit/:id', function(req, res) {
  var time = new Date().toIsoString().slice(0, 19).replace('T', ' ');
  var pet = req.params.id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "visits" ("check_in_date", "pet_id")' +
                      'VALUES ($1, $2;';
      db.query(queryText, [time, pet], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.put('/pet', function(req, res) {
  var pet = req.body;
  console.log(pet);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "pets" SET "name" = $1, "breed" = $2, "color" = $3) WHERE "id" = $4;';
      db.query(queryText, [pet.name, pet.breed, pet.color, pet.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/visit/:id', function(req, res) {
  var time = new Date().toIsoString().slice(0, 19).replace('T', ' ');
  var pet = req.params.id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "visits" SET "check_out_date" = $1 WHERE "pet_id" = $2;';
      db.query(queryText, [time, pet], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.delete('/pet/:id', function(req, res) {
  var pet = req.params.id;
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "pets" WHERE id = $1;';
      db.query(queryText, [pet], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
