// ~~~ load node modules  ~~~
// var db = require("../models");  // require databases
var express = require('express');
var request = require('request');
var router = express.Router();


var arrOfIngredients = [];

// render shopping list page with drink names and trimmed ingredients
router.get('/', function(req,res) {
  res.render('shopping/index',{shopList:arrOfIngredients});
});

router.post('/', function(req,res) {

  req.body.Ingredients = req.body.Ingredients.split(',');

  arrOfIngredients.push(req.body);

  // res.send(arrOfIngredients);
  res.redirect('/shopping');
});


module.exports = router;