// ~~~ load node modules  ~~~
var db = require("../models");  // require databases
var express = require('express');
var request = require('request');
var router = express.Router();


// READ - reads db and renders favorites page
router.get('/', function(req,res) {

  db. favorite.findAll()
    .then(function(fav) {
      var locals = {drinks:fav};
      var user = req.getUser();
      locals.user = user;
      res.render('favorites/index',locals);
    });
});


// CREATE - add drink to favorites from hidden form values
router.post('/', function(req,res) {

  var user = req.getUser(); // middleware to get user

  db.favorite.findOrCreate({where: {
    RecipeID: req.body.RecipeID,
    Title: req.body.Title,
    userId: user.id
  }})
    .spread(function(createdFav, createdBoolean) {
      // res.redirect('/favorites'); // remove for AJAX
      res.send({result:createdFav});
    });
});


// DESTROY - remove drink from favs
router.delete('/:id', function(req,res) {
  console.log('Waiting to DELETE: favDrink',req.params.id);// LOG
  db.favorite.destroy({where: {RecipeID: req.params.id}})
    .then(function() {
      console.log('DELETED backside: favDrink',req.params.id);// LOG
      res.send({result:true});
    });
});





module.exports = router;