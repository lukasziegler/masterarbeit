// "use strict";

	// TODO: Linter verwenden


/** 
 * Embed Models
 */

var Question = require('./models/question');


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

	Question.find({}, function (err, questions) {
		if (err) return console.error(err);
		console.log(questions);
		res.send(questions);
	});

});

// accept PUT request at /user
app.put('/question', function (req, res, next) {
  // res.send('Got a PUT request at /question');

  Question.add(function(err, created) {
	if (err) return console.error(err);
		console.log(created);
		res.send(created);

  });
  // question.add(req.params.question, function() {
  		// if(err) next(err);
  		// else {
  		// }

  // })
})

// accept DELETE request at /user
app.delete('/question', function (req, res, next) {
  res.send('Got a DELETE request at /question');
})


/** 
 * USERS
 */ 




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
