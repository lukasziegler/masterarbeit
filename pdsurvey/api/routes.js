// "use strict";
	// TODO: Linter verwenden


// Embed Models 

var QuestionModel = require('./models/question');
var UserModel = require('./models/user');


// Define Routes

router.get('/', function (req, res, next) {
  res.send('Welcome to PDSurvey\'s REST API');
})


/** 
 * QUESTIONS
 */ 

router.route('/questions')

	// GET 
	.get(function (req, res, next) {
		QuestionModel.find({}, function (err, questions) {
			if (err) return console.error(err);
			res.send(questions);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		QuestionModel.add(req, function (err, created) {
			if (err) return console.error(err);
			res.send(created);
		});
	})



router.route('/questions/:id')

	// GET single element
	.get(function (req, res, next) {
		QuestionModel.findOne({ '_id': req.params.id }, function (err, question) {
			if (err) return console.error(err);
			res.send(question);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

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
				}
				res.json(question);
			})
		});
	})

	// DELETE
	.delete(function (req, res, next) {

	  // TODO implement authentication / validation

		QuestionModel.remove({ _id: req.params.id }, function(err, question) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})






/** 
 * USERS
 */ 

 router.route('/users')

	// GET
	.get(function (req, res, next){
		UserModel.find({}, function (err, users) {
			if (err) return console.error(err);
			res.send(users);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		UserModel.add(req, function (err, users) {
			if (err) return console.error(err);
			res.send(users);
		});
	})


router.route('/users/:id')

	.delete(function (req, res, next) {
		next(new Error('not implemented'));
	});

	/* Custom Error Handling */
	// 	if(err) next(new MyError("Bluberror", 401)
	// 	else res.send(result)
	// TODO: Think about creating my own type of errors
	// e.g. look at GitHub > Mongoose/libs/error.js


// sample GET request
router.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});

