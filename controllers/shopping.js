var db = require("../models");
var express = require('express');
var async = require('async');  // handles multiple multiple db calls asyncly
var router = express.Router();
var _ = require('lodash');  // handles sorting data for posting to shopping list


// READ - render shopping list
router.get('/', function(req,res) {
  var user = req.getUser();

  db.shopping.findAll({where: {userId: user.id}})
    .then(function(ingredients) {
      var locals = {shopList:ingredients};  // ingrredients is an array of objects, 1 drink has many ingrdts
      locals.user = user;

      // lodash groups all ingredients to their drink key RecipeID
      locals.groupedIngredients = _.groupBy(ingredients, "RecipeID");
      // returns an object of arrays for each drink

      res.render('shopping/index',locals);
    });
});


// CREATE - AJAX add user shopping drink to db
router.post('/', function(req,res) {
  var user = req.getUser();

  // ingredients are returned as a string so convert to array
  var ingredients = req.body.Ingredients.split(',');

  // iterates through ingedients and add to db
  var createIngredient = function(ingredient,callback) {
    db.shopping.findOrCreate({where: {
      RecipeID: req.body.RecipeID,
      Title: req.body.Title,
      Name: ingredient.trim().toLowerCase(),
      userId: user.id
    }})
      .spread(function(createdItem, created) {
        callback(); // counter to match length of ingredients
      });
  };

  // AJAX - redirect to shopping page
  var redirectToShopping = function(err){
    res.send({result:true});
  };

  // async cycles iterattes through and calls function asyncly
  // then hits callback after all iterations done
  async.each(ingredients,createIngredient,redirectToShopping);
  // async.each( ARRAY , FUNCTION , CallBack );
});


// DESTROY - AJAX remove drink from shopping list db
router.delete('/:id', function(req,res) {

  db.shopping.destroy({where: {RecipeID: req.params.id}})
    .then(function() {
      res.send({result:true});
    });
});

module.exports = router;
