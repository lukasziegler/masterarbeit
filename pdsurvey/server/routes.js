// "use strict";
// TODO: Linter verwenden


// Embed Models in the correct order !!
Schema = require('./schema');

// var QuestionType = Schema.QuestionTypeModel;
// var Question = Schema.QuestionModel;
// var Category = Schema.CategoryModel;
// var Survey = Schema.SurveyModel;
// var StandardSurvey = Schema.StandardSurveyModel;
// var Display = Schema.DisplayModel;
// var Campaign = Schema.CampaignModel;
// var Context = Schema.ContextModel;
// var User = Schema.UserModel;


// Define Routes

router.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})


/** 
 * QUESTIONS
 */ 

require("./models/questions");


/** 
 * QUESTION TYPES
 */ 

require("./models/questionTypes");


/** 
 * CATEGORIES
 */ 

require("./models/categories");


/** 
 * SURVEYS
 */ 

require("./models/surveys");


/** 
 * STANDARDIZED SURVEYS
 */ 

require("./models/standardSurvey");


/** 
 * DISPLAYS
 */ 

require("./models/displays");


/** 
 * CAMPAIGNS
 */ 

require("./models/campaigns");


/** 
 * CONTEXTS
 */ 

require("./models/contexts");


/** 
 * USERS
 */ 

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

