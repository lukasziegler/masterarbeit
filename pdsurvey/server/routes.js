// "use strict";
// TODO: Linter verwenden


// Embed Models (! watch for correct order !)
var Schema = require('./models/schema');
	QuestionType = Schema.QuestionTypeModel,
	Question = Schema.QuestionModel,
	Category = Schema.CategoryModel,
	Survey = Schema.SurveyModel,
	StandardSurvey = Schema.StandardSurveyModel,
	Display = Schema.DisplayModel,
	Campaign = Schema.CampaignModel,
	Context = Schema.ContextModel,
	User = Schema.UserModel;


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
		Question.find({})
		.populate('type category', 'name')
		.exec(function (err, questions) {
			if (err) return console.error(err);
			res.send(questions);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newQuestion = new Question({
			type: req.body.type,
			name: req.body.name,
			explanation: req.body.explanation,
			category: req.body.category
			// state: req.body.state
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
		Question.findOne({ '_id': req.params.id })
		.populate('type category', 'name')
		.exec(function (err, question) {
			if (err || !question) return console.error(err);
			res.send(question);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Question.findById( req.params.id, function (err, question) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			question.type = req.body.type,
			question.name = req.body.name,
			question.explanation = req.body.explanation,
			question.category = req.body.category
			// question.state = req.body.state

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

	  	Question.remove({ _id: req.params.id }, function(err, question) {
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
		QuestionType.find({}, function (err, questionTypes) {
			if (err) return console.error(err);
			res.send(questionTypes);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newQuestionType = new QuestionType({
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
		QuestionType.findOne({ '_id': req.params.id })
		.exec(function (err, questionType) {
			if (err || !questionType) return console.error(err);
			res.send(questionType);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return QuestionType.findById( req.params.id, function (err, questionType) {
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

		QuestionType.remove({ _id: req.params.id }, function(err, questionType) {
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
		Category.find({}, function (err, categories) {
			if (err) return console.error(err);
			res.send(categories);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCategory = new Category({
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
		Category.findOne({ '_id': req.params.id })
		.exec(function (err, category) {
			if (err || !category) return console.error(err);
			res.send(category);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Category.findById( req.params.id, function (err, category) {
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
		Category.remove({ _id: req.params.id }, function(err, category) {
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
		Survey.find({}, function (err, surveys) {
			if (err) return console.error(err);
			res.send(surveys);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newSurvey = new Survey({
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
		Survey.findOne({ '_id': req.params.id })
		.exec(function (err, survey) {
			if (err || !survey) return console.error(err);
			res.send(survey);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Survey.findById( req.params.id, function (err, survey) {
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
		Survey.remove({ _id: req.params.id }, function(err, survey) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})





/** 
 * STANDARDIZED SURVEYS
 */ 

router.route('/standardSurvey')

	// GET 
	.get(function (req, res, next) {
		StandardSurvey.find({})
		.populate('category')
		// .populate('sections.questions.type')
		.exec(function (err, standardSurveys) {
			if (err) return console.error(err);
			res.send(standardSurveys);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newStandardSurvey = new StandardSurvey({
			name: req.body.name,
			category: req.body.category,
			sections: req.body.sections,
			description: req.body.description
		});

	    newStandardSurvey.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newStandardSurvey);
	    });
	})


router.route('/standardSurvey/:id')

	// GET single element
	.get(function (req, res, next) {
		StandardSurvey.findOne({ '_id': req.params.id })
		.populate('category')
		.exec(function (err, standardSurvey) {
			if (err || !standardSurvey) return console.error(err);
			res.send(standardSurvey);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return StandardSurvey.findById( req.params.id, function (err, standardSurvey) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			standardSurvey.name = req.body.name,
			standardSurvey.category = req.body.category,
			standardSurvey.sections = req.body.sections,
			standardSurvey.description = req.body.description

			return standardSurvey.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(standardSurvey);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		StandardSurvey.remove({ _id: req.params.id }, function(err, standardSurvey) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})








/** 
 * DISPLAYS
 */ 

router.route('/displays')

	// GET 
	.get(function (req, res, next) {
		Display.find({}, function (err, displays) {
			if (err) return console.error(err);
			res.send(displays);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newDisplay = new Display({
			name: req.body.name,
			producer: req.body.producer,
			url: req.body.url,
			characteristics: req.body.characteristics,
			contextStatic: req.body.contextStatic
		});

	    newDisplay.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newDisplay);
	    });
	})


router.route('/displays/:id')

	// GET single element
	.get(function (req, res, next) {
		Display.findOne({ '_id': req.params.id })
		.exec(function (err, display) {
			if (err || !display) return console.error(err);
			res.send(display);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Display.findById( req.params.id, function (err, display) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			display.name = req.body.name,
			display.producer = req.body.producer,
			display.url = req.body.url,
			display.characteristics = req.body.characteristics,
			display.contextStatic = req.body.contextStatic

			return display.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(display);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		Display.remove({ _id: req.params.id }, function(err, display) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})







/** 
 * CAMPAIGNS
 */ 

router.route('/campaigns')

	// GET 
	.get(function (req, res, next) {
		Campaign.find({}, function (err, campaigns) {
			if (err) return console.error(err);
			res.send(campaigns);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCampaign = new Campaign({
			name: req.body.name,
			description: req.body.description,
			display: req.body.display,
			survey: req.body.survey,
			contextDynamic: req.body.contextDynamic,
			minResponses: req.body.minResponses,
			createdBy: req.body.createdBy,
			dateCreated: new Date().toISOString()
		});

	    newCampaign.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newCampaign);
	    });
	})


router.route('/campaigns/:id')

	// GET single element
	.get(function (req, res, next) {
		Campaign.findOne({ '_id': req.params.id })
		.exec(function (err, campaign) {
			if (err || !campaign) return console.error(err);
			res.send(campaign);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Campaign.findById( req.params.id, function (err, campaign) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			campaign.name = req.body.name,
			campaign.description = req.body.description,
			campaign.startDate = new Date().toISOString(),
			campaign.endDate = new Date().toISOString(),
			campaign.display = req.body.display,
			campaign.survey = req.body.survey,
			campaign.contextDynamic = req.body.contextDynamic,
			campaign.minResponses = req.body.minResponses

			return campaign.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(campaign);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Campaign.remove({ _id: req.params.id }, function(err, campaign) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})






/** 
 * CONTEXTS
 */ 

router.route('/contexts')

	// GET 
	.get(function (req, res, next) {
		Context.find({}, function (err, contexts) {
			if (err) return console.error(err);
			res.send(contexts);
		});
	})

	// POST to create
	.post(function (req, res, next) {

		var newContext = new Context({
			type: req.body.type,
			context: req.body.context
		});

		console.log("DEBUG", newContext)

	    newContext.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newContext);
	    });
	})


router.route('/contexts/:id')

	// GET single element
	.get(function (req, res, next) {
		Context.findOne({ '_id': req.params.id })
		.exec(function (err, context) {
			if (err || !context) return console.error(err);
			res.send(context);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Context.findById( req.params.id, function (err, context) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			context.type = req.body.type,
			context.context = req.body.context

			return context.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(context);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		Context.remove({ _id: req.params.id }, function(err, context) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})







/** 
 * USERS
 */ 

router.route('/users')

	// GET 
	.get(function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) return console.error(err);
			res.send(users);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newUser = new User({
			username: req.body.username,
			fullname: req.body.fullname,
			email: req.body.email
		});

	    newUser.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newUser);
	    });
	})


router.route('/users/:id')

	// GET single element
	.get(function (req, res, next) {
		User.findOne({ '_id': req.params.id })
		.exec(function (err, user) {
			if (err || !user) return console.error(err);
			res.send(user);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return User.findById( req.params.id, function (err, user) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			user.username = req.body.username,
			user.fullname = req.body.fullname,
			user.email = req.body.email

			return user.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(user);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		User.remove({ _id: req.params.id }, function(err, user) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})





/* Custom Error Handling */
// 	if(err) next(new MyError("Bluberror", 401)
// 	else res.send(result)
// TODO: Think about creating my own type of errors
// e.g. look at GitHub > Mongoose/libs/error.js


// sample GET request
router.get('/ping', function (req, res, next) {
    res.render('index', { title: 'Pong', software: 'Express' });
});

