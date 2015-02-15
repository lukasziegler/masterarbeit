var Survey = Schema.SurveyModel;

/** 
 * SURVEYS
 */ 

router.route('/surveys')

	// GET 
	.get(function (req, res, next) {
		Survey.find({})
		.populate('category')
		.exec(function (err, surveys) {
			if (err) return next(err);
			res.send(surveys);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newSurvey = new Survey({
			name: req.body.name,
			category: req.body.category,
			state: req.body.state,
			description: req.body.description,
			sections: req.body.sections,
			maxQuestions: req.body.maxQuestions,
			createdBy: req.body.createdBy,
			lastChange: new Date().toISOString()
		});

	    newSurvey.save(function(err) {
	        if (err) {
	        	return next(err);
	        }
    	    return res.send(newSurvey);
	    });
	})


router.route('/surveys/:id')

	// GET single element
	.get(function (req, res, next) {
		Survey.findOne({ '_id': req.params.id })
		.populate('category')
		.exec(function (err, survey) {
			if (err || !survey) return next(err);
			res.send(survey);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Survey.findById( req.params.id, function (err, survey) {
			if (err) {
				return next(err);
			}

			// update object
			survey.name = req.body.name,
			survey.category = req.body.category,
			survey.state = req.body.state,
			survey.description = req.body.description,
			survey.sections = req.body.sections,
			survey.maxQuestions = req.body.maxQuestions,
			survey.lastChange = new Date().toISOString()

			return survey.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(survey);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Survey.remove({ _id: req.params.id }, function(err, survey) {
			if (err) return next(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})