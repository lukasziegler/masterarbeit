Schema = require('./schema');

/** 
 * Define Routes
 ! Embed Models in the correct order
 */ 

router.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})

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


// sample GET request
router.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});
