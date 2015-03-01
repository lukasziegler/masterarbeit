// "use strict";
// TODO: Linter verwenden


Schema = require('./schema');


// Middleware to be used for every secured route
var auth = function(req, res, next){
	if (!req.isAuthenticated()) 
		res.status(401).end();
	else
		next();
};


/** 
 * Define Routes
 ! Embed Models in the correct order
 */ 

router.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})

router.get('/secret', auth, function (req, res, next) {
  res.send('This page is only visible when logged in');
})

//==================================================================

// route to test if the user is logged in or not
router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
})

// route to log in
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
})

// route to log out
router.post('/logout', function(req, res){
  req.logOut();
  res.status(200).end();
})

//==================================================================



// Questions
require("./api/questions");
require("./api/nextQuestion");

// Responses
require("./api/responses");

// Question Types
require("./api/questionTypes");

// Categories
require("./api/categories");

// Surveys
require("./api/surveys");

// Display Models
require("./api/displayModels");

// Displays per User
require("./api/displays");

// Campaigns
require("./api/campaigns");

// Contexts
require("./api/contexts");

// USers
require("./api/users");



/* Custom Error Handling */
// 	if(err) next(new MyError("Bluberror", 401)
// 	else res.send(result)
// TODO: Think about creating my own type of errors
// e.g. look at GitHub > Mongoose/libs/error.js


// sample GET request
router.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});
