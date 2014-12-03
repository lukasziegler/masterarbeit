// "use strict";

	// TODO: Linter verwenden


/** 
 * Embed Models
 */

var QuestionModel = require('./models/question');
var UserModel = require('./models/user');


/**
 * Define Routes
 */

app.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})


/** 
 * QUESTIONS
 */ 

// accept GET requests
app.get('/question', function (req, res, next) {

	QuestionModel.find({}, function (err, questions) {
		if (err) return console.error(err);
		console.log(questions);
		res.send(questions);
	});

});

// POST to create
app.post('/question', function (req, res, next) {


	QuestionModel.add(req, function (err, created) {
		if (err) return console.error(err);
		res.send(created);
	});
	
  // question.add(req.params.question, function() {
  		// if(err) next(err);
  		// else {
  		// }
  // })
})

// PUT to update

// DELETE
app.delete('/question', function (req, res, next) {
  res.send('Got a DELETE request at /question');

  // TODO implement authentication / validation
})



/** 
 * USERS
 */ 

// GET
app.get('/user', function (req, res, next){
	UserModel.find({}, function (err, users) {
		if (err) return console.error(err);
		res.send(users);
	});
});

// POST to CREATE
app.post('/user', function (req, res, next) {
	
	UserModel.add(req, function (err, users) {
		if (err) return console.error(err);
		res.send(users);
	});

});

// PUT to UPDATE




	// model.bla(function(err, result) {
	// 	if(err) next(new MyError("Bluberror", 401)
	// 	else res.send(result)
	// })
	
	// TODO: Think about creating my own type of errors
	// e.g. look at GitHub > Mongoose/libs/error.js


/** 
 * TESTING
 */ 

// sample GET request
app.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});
