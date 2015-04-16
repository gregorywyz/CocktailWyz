// ~~~ load node modules  ~~~
var db = require("../models");  // require databases
var express = require('express');
var request = require('request');
var router = express.Router();
var async = require('async');
var _ = require('lodash');




// render shopping list page with drink names and trimmed ingredients
router.get('/', function(req,res) {

  var user = req.getUser();

  db.shopping.findAll({where: {userId: user.id}})
    .then(function(ingredients) {
      var locals = {shopList:ingredients};
      locals.user = user;

      locals.taco = _.groupBy(ingredients, "Title");

      res.render('shopping/index',locals);
    });
});


// add ingedients to shopping list page
router.post('/', function(req,res) {
  // convert ingredients to an array
  var ingredients = req.body.Ingredients.split(',');
  console.log('~~~ingredients~~~',ingredients);
  var user = req.getUser(); // middleware to get user

  // USE FOR ADDING USER TO DB - middleware
  //var user = req.getUser();
  //user.id

  var createIngredient = function(ingredient,callback) {
    db.shopping.findOrCreate({where: {
      RecipeID: req.body.RecipeID,
      Title: req.body.Title,
      // IngredientID:
      Name: ingredient.trim().toLowerCase(),
      userId: user.id
    }})
      .spread(function(createdItem, createdBoolean) {
        // callback counts to match length of ingredient
        callback();
      })
  };
  var redirectToShopping = function(err){
    // res.redirect('/shopping'); // remove for AJAX
    res.send({result:true});
  };

  // iterate through ingredients and add to db
  // async cycles iterattes through and calls function asyncly, then hits callback after all iterations done
  async.each(ingredients,createIngredient,redirectToShopping);

});


// DESTROY - remove drink from shopping list
router.delete('/:id', function(req,res) {
  console.log('Waiting to DELETE: shopDrink',req.params.id);// LOG
  db.shopping.destroy({where: {RecipeID: req.params.id}})
    .then(function() {
      console.log('DELETED backside: shopDrink',req.params.id);// LOG
      res.send({result:true});
    });
});


var noRepeats = function(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      newArray.push(array[i]);
    }
  }
  return newArray
};




module.exports = router;