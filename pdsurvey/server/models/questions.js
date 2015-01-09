var Question = Schema.QuestionModel;

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