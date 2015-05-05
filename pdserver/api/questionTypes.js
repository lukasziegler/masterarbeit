var QuestionType = Schema.QuestionTypeModel;

/** 
 * QUESTION TYPES
 */ 

router.route('/questionTypes')

	// GET 
	.get(function (req, res, next) {
		QuestionType.find({}, function (err, questionTypes) {
			if (err) {
				return next(err);
			}
			res.send(questionTypes);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newQuestionType = new QuestionType({
			name: req.body.name,
			description: req.body.description,
			// abbreviation: req.body.abbreviation,
			params: req.body.params,
			constraints: req.body.constraints
		});

	    newQuestionType.save(function(err) {
			if (err) {
				return next(err);
			}
    	    return res.send(newQuestionType);
	    });
	})


router.route('/questionTypes/:id')

	// GET single element
	.get(function (req, res, next) {
		QuestionType.findOne({ '_id': req.params.id })
		.exec(function (err, questionType) {
			if (err || !questionType) {
				return next(err);
			}
			res.send(questionType);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return QuestionType.findById( req.params.id, function (err, questionType) {
			if (err) {
				return next(err);
			}

			// update object
			questionType.name = req.body.name,
			questionType.description = req.body.description,
			// questionType.abbreviation = req.body.abbreviation,
			questionType.params = req.body.params,
			questionType.constraints = req.body.constraints

			return questionType.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(questionType);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {

	  // TODO implement authentication / validation

		QuestionType.remove({ _id: req.params.id }, function(err, questionType) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})
