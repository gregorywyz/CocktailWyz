var db = require("../models");
var express = require('express');
// var request = require('request'); // remove or replace when sure
var router = express.Router();


// READ - reads db and renders favorites page
router.get('/', function(req,res) {
  var user = req.getUser();

  db.favorite.findAll({where: {userId: user.id}})
    .then(function(fav) {
      var locals = {drinks:fav};
      locals.user = user;
      res.render('favorites/index',locals);
    });
});


// CREATE - AJAX add drink to favs db hidden form values
router.post('/', function(req,res) {
  var user = req.getUser();

  db.favorite.findOrCreate({where: {
    RecipeID: req.body.RecipeID,
    Title: req.body.Title,
    userId: user.id
  }})
    .spread(function(createdFav, createdBoolean) {
      res.send({result:createdFav});
    });
});


// DESTROY - AJAX remove drink from favs db
router.delete('/:id', function(req,res) {

  db.favorite.destroy({where: {RecipeID: req.params.id}})
    .then(function() {
      res.send({result:true});
    });
});


module.exports = router;