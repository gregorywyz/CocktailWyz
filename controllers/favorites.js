// ~~~ load node modules  ~~~
// var db = require("../models");  // require databases
var express = require('express');
var request = require('request');
var router = express.Router();


var arrOfDrinks = [];

// render favorites page with drink names
router.get('/', function(req,res) {
  res.render('favorites/index',{drinks:arrOfDrinks})
});

router.post('/', function(req,res) {
  arrOfDrinks.push(req.body);
  // res.send(locals);
  res.redirect('/favorites');
});


module.exports = router;