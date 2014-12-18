// "use strict";
	// TODO: Linter verwenden


// Embed Models 

var QuestionModel = require('./models/question');
var QuestionTypeModel = require('./models/questionType');
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
		var newQuestion = new QuestionModel({
			type: req.body.type,
			name: req.body.name,
			description: req.body.description,
			explanation: req.body.explanation,
			category: req.body.category,
			state: req.body.state
		});

	    newQuestion.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newQuestion);
	    });
	})



router.route('/questions/:id')

	// GET single element
	.get(function (req, res, next) {
		QuestionModel.findOne({ '_id': req.params.id }, function (err, question) {
			if (err || !question) return console.error(err);
			res.send(question);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return QuestionModel.findById( req.params.id, function (err, question) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			question.type = req.body.type,
			question.name = req.body.name,
			question.description = req.body.description,
			question.explanation = req.body.explanation,
			question.category = req.body.category,
			question.state = req.body.state

			return question.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(question);
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
 * QUESTION TYPES
 */ 

router.route('/questionTypes')

	// GET 
	.get(function (req, res, next) {
		QuestionTypeModel.find({}, function (err, questionTypes) {
			if (err) return console.error(err);
			res.send(questionTypes);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newQuestionType = new QuestionTypeModel({
			name: req.body.name,
			description: req.body.description,
			parameters: req.body.parameters,
			constraints: req.body.constraints
		});

	    newQuestionType.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newQuestionType);
	    });
	})



router.route('/questionTypes/:id')

	// GET single element
	.get(function (req, res, next) {
		QuestionTypeModel.findOne({ '_id': req.params.id }, function (err, questionType) {
			if (err || !questionType) return console.error(err);
			res.send(questionType);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return QuestionTypeModel.findById( req.params.id, function (err, questionType) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			questionType.name = req.body.name,
			questionType.description = req.body.description,
			questionType.parameters = req.body.parameters,
			questionType.constraints = req.body.constraints

			return questionType.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(questionType);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {

	  // TODO implement authentication / validation

		QuestionTypeModel.remove({ _id: req.params.id }, function(err, questionType) {
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

