// ~~~ load node modules  ~~~
var db = require("../models");
var express = require('express');
var request = require('request');
var Instagram = require('instagram-node-lib');
var router = express.Router();



// READ - render results page with results from API
router.get('/results', function(req,res) {
  var user = req.getUser();
  var drinkList = [];
  var query = req.query.q;  // search text from form
  if (!query) {res.send('you need to enter something')}; // for blank search term

  // BigOven API route for recipes search
  var bigOvenUrl = 'http://api.bigoven.com/recipes';

  // set up query for url
  var queryData = {
    pg:1,
    rpp:20,
    api_key:process.env.BO_KEY,
    title_kw:query
  };

  // API return XML by defualt
  // pass url in as object, change headers to return JSON
  request({
    url:bigOvenUrl,
    qs:queryData,
    headers:{
      'Accept':'application/json'
    }
  },function(error,response,data) {

    if (!error && response.statusCode == 200) {
      var searchResults = JSON.parse(data);

      searchResults.Results.forEach(function(drink,idx) {
        if (drink.Category === 'Drinks') {  // set API to only return drinks only
          drinkList.push(drink);  // array of drink objects
        };
      });
      console.log('~~~~~~~~~~~~~~~ Found Drinks:',drinkList.length)
      if (drinkList.length == 0) {res.send('Sorry, our records show that drink does not exist')}; // for 0 search results

      var instaArray = ['cocktail','whiskeysour','gimlet','margaritaontherocks','whiskeyginger','caipirinhas'];
      Instagram.tags.recent({
        name: instaArray[Math.floor(Math.random() * (instaArray.length))],  // tag name
        complete: function(data){
          var picsArray = data; // array of pics

          res.render('drinks/results',{Results:drinkList,user:user,pics:picsArray});
        }
      });

      // res.render('drinks/results',{Results:drinkList,user:user});
    } else {
      res.send('Sorry no cocktails here, try another drink');
    };
  });
});




// READ - render show page with results from API
router.get('/drink/:id', function(req,res) {
  var user = req.getUser();
  var recID = parseInt(req.params.id);
  console.log('~~~~~~~~~~~~~~~~~~~ recID',recID)

  // BigOven API route for recipeID search (detailed data on drink)
  var bigOvenUrl2 = 'http://api.bigoven.com/recipe/' + recID + '?api_key=' + process.env.BO_KEY;

  // API return XML by defualt
  // pass url in as object, change headers to return JSON
  request({
    url:bigOvenUrl2,
    headers:{
      'Accept':'application/json'
    }
  },function(error,response,data) {
    if (!error && response.statusCode == 200) {
      var recipe = JSON.parse(data);
      recipe.user = user;
      console.log('~~~~~~~~~~~~~~~~~~~~ RecipeID', recipe.RecipeID)
      // if (!recipe.RecipeID) {res.send('that is not a drink')}; // for 500 error
      if (!recipe.RecipeID) {res.status(500).send('500 error caught!')}; // for 500 error

      // set boolean to toggle fav button
      db.favorite.find({where: {RecipeID: req.params.id, userId: user.id}})
        .then(function(favorite) {
          if (favorite !== null) {
            recipe.fav = true;
          } else {
            recipe.fav = false;
          };

        // set boolean to toggle shop button
        db.shopping.find({where: {RecipeID: req.params.id, userId: user.id}})
          .then(function(shopping) {
            if (shopping !== null) {
              recipe.shop = true;
            } else {
              recipe.shop = false;
            };

          res.render('drinks/show',recipe);
          });
        });
    };
  });
});



module.exports = router;

