// ~~~ load node modules  ~~~
var db = require("../models");  // require databases
var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/',function(req,res) {
  var user = req.getUser();
  res.render('drinks/index',{user:user});
});


// render search results page with only categories of 'drinks'
router.get('/results', function(req,res) {

  var drinkList = [];
  var query = req.query.q;
  // route for search of recipes
  var bigOvenUrl = 'http://api.bigoven.com/recipes';

  // set up query for url
  var queryData = {
    pg:1,
    rpp:20,
    api_key:process.env.BO_KEY,
    title_kw:query
  };

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
      // console.log('searchRsults is:',typeof searchResults);
      searchResults.Results.forEach(function(drink,idx) {
        if (drink.Category === 'Drinks') {
          drinkList.push(drink);
          // console.log('name:',drink.Title);
          // console.log('recipeID:',drink.RecipeID);
        };
      });
      // console.log(searchResults.Results[0].Title);
      console.log(drinkList.length)
      // res.send(searchResults);
      var user = req.getUser();
      res.render('drinks/results',{Results:drinkList,user:user});

    } else {
      res.send('Sorry no cocktails here, try another drink');
    };
  });
});


// render show page with recipe details
router.get('/drink/:id', function(req,res) {

  var recID = req.params.id;
  // route for details on specific recipe
  var bigOvenUrl2 = 'http://api.bigoven.com/recipe/' + recID + '?api_key=' + process.env.BO_KEY;

  request({
    url:bigOvenUrl2,
    headers:{
      'Accept':'application/json'
    }
  },function(error,response,data) {
    if (!error && response.statusCode == 200) {
      var recipe = JSON.parse(data);
      // set boolean to toggle fav button
      db.favorite.find({where: {RecipeID: req.params.id}})
        .then(function(favorite) {
          if (favorite !== null) {
            recipe.fav = true;
          } else {
            recipe.fav = false;
          };

        // set boolean to toggle shop button
        db.shopping.find({where: {RecipeID: req.params.id}})
          .then(function(shopping) {
            if (shopping !== null) {
              recipe.shop = true;
            } else {
              recipe.shop = false;
            };
          var user = req.getUser();
          recipe.user = user;
          res.render('drinks/show',recipe);
          });
        });
    };
  });
});



module.exports = router;




// // ~~~ load node modules  ~~~
// // var db = require("../models");  // require databases
// var express = require('express');
// var request = require('request');
// var router = express.Router();

// router.get('/name', function(req,res) {

//   var query = req.query.q;
//   var url = 'http://addb.absolutdrinks.com/quickSearch/drinks/' + query + '/?Apikey=' + process.env.ADDB_KEY;
//   console.log('query',query)
//   console.log('url',url);

//   request(url, function(error,response,data) {
//     var locals = JSON.parse(data);

//     if (locals.result) {
//       console.log('GET search:',locals) // array of drinks
//       res.render('drinks/results',locals);
//     } else {
//       res.send('please pick another cocktail');
//     };

//     // res.render('drinks/results');
//   })
// });

// router.get('/name/:id', function(req,res) {

//   var query = req.params.id;
//   var url = 'http://addb.absolutdrinks.com/drinks/' + query + '/?Apikey=' + process.env.ADDB_KEY;
//   console.log('query',query)
//   console.log('url',url);

//   request(url, function(error,response,data) {
//     var locals = JSON.parse(data);
//     if (locals.result) {
//       // res.send(locals.result);
//       res.render('drinks/show',locals);
//     } else {
//       res.send('sorry we do not have any info on that cocktail');
//     }
//   })
// });

// router.get('/ingredients', function(req,res) {

//   var query = req.query.i;
//   var urlName = 'http://addb.absolutdrinks.com/quickSearch/ingredients/' + query + '/?Apikey=' + process.env.ADDB_KEY;


//   var ingredientOfChoice = '';

//   // search for list of ingredients
//   request(urlName, function(error,response,data) {

//     var locals = JSON.parse(data);

//     locals.result.forEach(function(ingredient, idx) {
//       if (ingredient.name.toLowerCase() == query.toLowerCase()) {
//         console.log('~~~~~ We have a match ~~~~',ingredient.id)
//         ingredientOfChoice = ingredient.id;
//       }
//       console.log('ingredient' + idx + ':',ingredient.id);
//     })

//     console.log('ingredientOfChoice', ingredientOfChoice);


//   //!!!! need to send in multiple ingredients as /with/ingredient_id...
//   // can possibly build up an array of ingredients, then itterate through to set as url

//    // set url for drink w/ ingredient search and search
//     var urlId = 'http://addb.absolutdrinks.com/drinks/with/' + ingredientOfChoice + '/?Apikey=' + process.env.ADDB_KEY;
//     request(urlId, function(error,response,data) {
//       var locals = JSON.parse(data);
//       // res.send(data);

//       res.render('drinks/results',locals);
//     });


//     // res.render('drinks/results');
//   })



// });



// module.exports = router;