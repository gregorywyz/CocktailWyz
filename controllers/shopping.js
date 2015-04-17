// ~~~ load node modules  ~~~
var db = require("../models");
var express = require('express');
var request = require('request');
var router = express.Router();
var async = require('async');  // handles multiple multiple db calls asyncly
var _ = require('lodash');  // handles sorting data for posting to shopping list


// READ - render shopping list
router.get('/', function(req,res) {
  var user = req.getUser();

  db.shopping.findAll({where: {userId: user.id}})
    .then(function(ingredients) {
      var locals = {shopList:ingredients};  // ingrredients is an array of objects, 1 drink many ingrdts
      locals.user = user;

      // lodash groups all ingredients to their drink key RecipeID
      locals.taco = _.groupBy(ingredients, "RecipeID");
      // returns an object of arrays for each drink

      res.render('shopping/index',locals);
    });
});


// CREATE - AJAX add user shopping drink to db
router.post('/', function(req,res) {
  var user = req.getUser();

  // ingredients are returned as a string so convert to array
  var ingredients = req.body.Ingredients.split(',');
  console.log('~~~~~~~~~~~~~~~~~~~~ Converted ingredients to ARRAY:',ingredients);

  // add user drink to database
  var createIngredient = function(ingredient,callback) {  // async will call this for every ingredient in array
    db.shopping.findOrCreate({where: {
      RecipeID: req.body.RecipeID,
      Title: req.body.Title,
      Name: ingredient.trim().toLowerCase(),
      userId: user.id
    }})
      .spread(function(createdItem, created) {
        console.log('~~~~~~~~~~~~~~~~~~~~ Found ingredient:',created);
        // callback counts to match length of ingredient before sending
        callback();
      });
  };

  // AJAX - redirect to shopping page
  var redirectToShopping = function(err){  // will be the callback for async
    console.log('~~~~~~~~~~~~~~~~~~~~ Going back to shopping page ~~~~~~~~~~~~');
    res.send({result:true});
  };

  // iterate through ingredients and add to db
  // async cycles iterattes through and calls function asyncly
  // then hits callback after all iterations done
  async.each(ingredients,createIngredient,redirectToShopping);   // async.each( ARRAY , FUNCTION , CallBack );
});


// DESTROY - AJAX remove drink from shopping list db
router.delete('/:id', function(req,res) {
  console.log('~~~~~~~~~~~~~~~~~~~~ Found RecipeID:',req.params.id);// LOG
  db.shopping.destroy({where: {RecipeID: req.params.id}})
    .then(function() {
      console.log('~~~~~~~~~~~~~~~~~~~~ DELETED RecipeID',req.params.id);// LOG
      res.send({result:true});
    });
});

module.exports = router;
