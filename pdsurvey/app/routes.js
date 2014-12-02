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

// accept PUT request at /user
app.put('/question', function (req, res, next) {
  // res.send('Got a PUT request at /question');

  QuestionModel.add(req.body , function(err, created) {
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
app.get('/user', function (req, res, next){
  return UserModel.find(function (err, products) {
    if (err) next(err);
  });
});

// POST to CREATE
app.post('/user', function (req, res, next) {
	// UserModel.add
  var user = new UserModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email
  });
  user.save(function (err) {
    if (!err) {
      return console.log("User created");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
});




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
