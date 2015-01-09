var QuestionType = Schema.QuestionTypeModel;

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
