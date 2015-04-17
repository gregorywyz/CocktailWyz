// ~~~ load node modules  ~~~
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var Instagram = require('instagram-node-lib');
// ~~~ load controllers  ~~~
var searchCtrl = require('./controllers/search.js');
var favsCtrl = require('./controllers/favorites.js');
var shopCtrl = require('./controllers/shopping.js');
var authCtrl = require('./controllers/auth.js');

var app = express();


// ~~~ setup express ~~~
app.set("view engine", "ejs");  // tell express to use .ejs files
app.use(express.static(__dirname + "/public"));  // tell express where static assets are to be served
app.use(bodyParser.urlencoded({extended: false}));  // use body-parser
app.use(flash());
app.use(session({
  secret:'Roger Rabbit',
  resave: false,
  saveUninitialized: true
}));

// custom middleware checks which user is logged in
app.use(function(req,res,next) {
  req.session.user = {
    id: 3
  }
  req.getUser = function() {
    return req.session.user || false;
  }
  next(); // triggers next middleware
});

// custom middleware for alerts
app.use(function(req,res,next){

  //gets alerts (if any) from flash
  //attach them to res.locals
  //things in res.locals these will be passed
  //to the view (ejs) when you do res.render
  res.locals.alerts=req.flash();

  next(); // triggers next middleware
})

Instagram.set('client_id', process.env.IG_ID);
Instagram.set('client_secret', process.env.IG_SECRET);



// ~~~ use controllers ~~~
app.use('/search', searchCtrl);
app.use('/favorites', favsCtrl);
app.use('/shopping', shopCtrl);
app.use('/auth', authCtrl);


// render home page
app.get('/', function(req,res) {
  var user = req.getUser();

  var locals = {};
  locals.user = user;

  var instaArray = ['cocktail','whiskeysour','gimlet','margaritaontherocks','whiskeyginger','caipirinhas'];
  Instagram.tags.recent({
    name: instaArray[Math.floor(Math.random() * (instaArray.length))] ,
    complete: function(data){
      locals.pics = data;
      console.log('~~~~~~~~~~~~~~length',data.length); // LOG
      // res.send(locals);
      res.render('index',locals);
    }
  });
});


// set server to listen for
app.listen(process.env.PORT || 3000, function() {
  console.log("~~~~~~~~~~ Server started on port 3000 ~~~~~~~~~~");
});


