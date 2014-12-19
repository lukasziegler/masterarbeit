// "use strict";
// TODO: Linter verwenden


// Embed Models (! watch for correct order !)
var Schema = require('./models/schema');
var QuestionTypeModel = require('./models/questionType');
var QuestionModel = require('./models/question');
var CategoryModel = Schema.CategoryModel;
var SurveyModel = Schema.SurveyModel;
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
		QuestionModel.find({})
		.populate('type', 'name')
		.exec(function (err, questions) {
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
		QuestionModel.findOne({ '_id': req.params.id })
		.populate('type')
		.exec(function (err, question) {
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
			if (err) return callback(err);
			
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
		QuestionTypeModel.findOne({ '_id': req.params.id })
		.exec(function (err, questionType) {
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
 * CATEGORIES
 */ 

router.route('/categories')

	// GET 
	.get(function (req, res, next) {
		CategoryModel.find({}, function (err, categories) {
			if (err) return console.error(err);
			res.send(categories);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCategory = new CategoryModel({
			name: req.body.name,
			description: req.body.description
		});

	    newCategory.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newCategory);
	    });
	})



router.route('/categories/:id')

	// GET single element
	.get(function (req, res, next) {
		CategoryModel.findOne({ '_id': req.params.id })
		.exec(function (err, category) {
			if (err || !category) return console.error(err);
			res.send(category);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return CategoryModel.findById( req.params.id, function (err, category) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			category.name = req.body.name,
			category.description = req.body.description

			return category.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(category);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		CategoryModel.remove({ _id: req.params.id }, function(err, category) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})









/** 
 * SURVEYS
 */ 

router.route('/surveys')

	// GET 
	.get(function (req, res, next) {
		SurveyModel.find({}, function (err, surveys) {
			if (err) return console.error(err);
			res.send(surveys);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newSurvey = new SurveyModel({
			name: req.body.name,
			maxQuestions: req.body.maxQuestions,
			createdBy: req.body.createdBy,
			lastChange: new Date().toISOString()
		});

	    newSurvey.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newSurvey);
	    });
	})


router.route('/surveys/:id')

	// GET single element
	.get(function (req, res, next) {
		SurveyModel.findOne({ '_id': req.params.id })
		.exec(function (err, survey) {
			if (err || !survey) return console.error(err);
			res.send(survey);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return SurveyModel.findById( req.params.id, function (err, survey) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			survey.name = req.body.name,
			survey.maxQuestions = req.body.maxQuestions,
			survey.lastChange = new Date().toISOString()

			return survey.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(survey);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		SurveyModel.remove({ _id: req.params.id }, function(err, survey) {
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

