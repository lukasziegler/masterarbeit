var Question = Schema.QuestionModel;

/** 
 * NEXT QUESTION (/api/nextQuestion)
 * 
 * Always returning the next question to ask the user
 * the goal is to keep the logic on server-side
 */ 

router.route('/nextQuestion')

	// GET 
	.get(function (req, res, next) {
		Question.findOne({})
		.populate('type category', 'name')
		.exec(function (err, questions) {
			if (err) {
				return next(err);
			}
			res.send(questions);
		});
	})