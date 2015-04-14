// ~~~ load node modules  ~~~
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var searchCtrl = require('./controllers/search.js');
var favsCtrl = require('./controllers/favorites.js');
var shopCtrl = require('./controllers/shopping.js');
var app = express();


// ~~~ setup express ~~~
app.set("view engine", "ejs");  // tell express to use .ejs files
app.use(express.static(__dirname + "/public"));  // tell express where static assets are to be served
app.use(bodyParser.urlencoded({extended: false}));  // use body-parser
app.use('/search', searchCtrl);
app.use('/favorites', favsCtrl);
app.use('/shopping', shopCtrl);


// render home page
app.get('/', function(req,res) {
  res.render('index');
  // res.send('hello WORLD!!!!')
});


// set server to listen for
app.listen(3000, function() {
  console.log("~~~~~~~~~~ Server started on port 3000 ~~~~~~~~~~");
});

// MOVED DOWN TUESDAY - set up for bigOven API
// app.get("/", function(req,res) {
//   var drinkList = [];
//   var query = 'mojito';
//   var bigOvenUrl = 'http://api.bigoven.com/recipes';
//   // set up query for url
//   var queryData = {
//     pg:1,
//     rpp:20,
//     api_key:'dvx59qENtcYtAr9f0238g7auJai7GeUx',
//     title_kw:query
//   };
//   // pass url in as object, change headers to return JSON
//   request({
//     url:bigOvenUrl,
//     qs:queryData,
//     headers:{
//       'Accept':'application/json'
//     }
//   },function(error,response,data) {
//     if (!error && response.statusCode == 200) {
//       var searchResults = JSON.parse(data);
//       searchResults.Results.forEach(function(drink,idx) {
//         if (drink.Category === 'Drinks') {
//          console.log('name:',drink.Title);
//          console.log('recipeID:',drink.RecipeID);
//          drinkList.push(drink.RecipeID);
//         }
//       })
//       // console.log(searchResults.Results[0].Title);
//       console.log('drinkList:',drinkList);
//       res.send(searchResults);
//     };
//   })
// })

// MOVED DOWN MONDAY - refactor for new API
// // var query = 'screwdriver';

// // request('http://addb.absolutdrinks.com/drinks/' + query + '/?Apikey=5fbe1c268530417d9f2a253da2a6ba5d', function(error,response,data) {
// //   if (!error && response.statusCode == 200) {
// //     var locals = JSON.parse(data)
// //     console.log('screwdriver',locals);
// //   }
// // })

// // render home page
// app.get('/', function(req,res) {
//   res.render('index');
// });

// app.get('/search/byName',function(req,res) {
//   res.render('search/byName');
// });

// app.get('/search/byIngredient',function(req,res) {
//   res.render('search/byIngredient');
// });

// // app.get('/ingredients', function(req,res) {
// //   res.send(req.params.i);
// // })


// request('http://addb.absolutdrinks.com/drinks/with/absinthe/with/lemon/with/cognac/?Apikey=' + process.env.ADDB_KEY, function(error,response,data) {
//   if (!error && response.statusCode == 200) {
//     var locals = JSON.parse(data)
//     console.log('~~~~~name~~~~~',locals.result[0].name);
//     console.log('~~~~~numOfIngredients~~~~~',locals.result[0].ingredients.length)
//     for (var i = 0; i < locals.result[0].ingredients.length; i++) {
//       console.log('~~~~~ingredient ' + i + '~~~~~', locals.result[0].ingredients[i].id)
//     }
//     console.log('~~~~~description~~~~~',locals.result[0].description);
//     console.log('~~~~~descriptionPlain~~~~~',locals.result[0].descriptionPlain);
//     console.log('~~~~~story~~~~~',locals.result[0].story);
//   }
// })
