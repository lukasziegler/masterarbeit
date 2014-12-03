// "use strict";
	// TODO: Linter verwenden


// Embed Models 

var QuestionModel = require('./models/question');
var UserModel = require('./models/user');



// Define Routes

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
		res.send(questions);
	});
});

app.get('/question/:id', function (req, res, next) {
	QuestionModel.findOne({ '_id': req.params.id }, function (err, question) {
		if (err) return console.error(err);
		res.send(question);
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
});

// PUT to update
app.put('/question/:id', function (req, res, next) {

	QuestionModel.findById( req.params.id, function (err, question) {
		if (err) {
			res.send('error updating');
			return console.error(err);
		}

		// update object
		question.type = req.body.type;
		question.shortName = req.body.shortName;
		question.explanation = req.body.explanation;
		question.category = req.body.category;
		question.status = req.body.status;

		question.save(function(err) {
			if (err) {
			res.send('Error updating, e.g. invalid mapping');
			return console.error(err);
			// return next(err);
		}
			res.json(question);
		})
	});
});

// DELETE
app.delete('/question/:id', function (req, res, next) {

  // TODO implement authentication / validation

	QuestionModel.remove({ _id: req.params.id }, function(err, question) {
		if (err) return console.error(err);
		
		res.send({ message: 'Successfully deleted' });
	});
});






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

app.delete('/user/:id', function (req, res, next) {
	next(new Error('not implemented'));
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

// TODO: think about a conversion from app.get/post TO router.use
