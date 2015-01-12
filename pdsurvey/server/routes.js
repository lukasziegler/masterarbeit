// "use strict";
// TODO: Linter verwenden


Schema = require('./schema');


// ! Embed Models in the correct order


/** 
 * Define Routes
 */ 

router.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})


// Questions
require("./models/questions");

// Responses
require("./models/responses");

// Question Types
require("./models/questionTypes");

// Categories
require("./models/categories");

// Surveys
require("./models/surveys");

// Standardized Questionnaires
require("./models/standardSurvey");

// Displays
require("./models/displays");

// Campaigns
require("./models/campaigns");

// Contexts
require("./models/contexts");

// USers
require("./models/users");



/* Custom Error Handling */
// 	if(err) next(new MyError("Bluberror", 401)
// 	else res.send(result)
// TODO: Think about creating my own type of errors
// e.g. look at GitHub > Mongoose/libs/error.js


// sample GET request
router.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});

