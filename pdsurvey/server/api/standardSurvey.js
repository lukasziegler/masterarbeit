var StandardSurvey = Schema.StandardSurveyModel;

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
			if (err) {
				return next(err);
			}
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
				return next(err);
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
			if (err || !standardSurvey) {
				return next(err);
			}
			res.send(standardSurvey);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return StandardSurvey.findById( req.params.id, function (err, standardSurvey) {
			if (err) {
				return next(err);
			}

			// update object
			standardSurvey.name = req.body.name,
			standardSurvey.category = req.body.category,
			standardSurvey.sections = req.body.sections,
			standardSurvey.description = req.body.description

			return standardSurvey.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(standardSurvey);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		StandardSurvey.remove({ _id: req.params.id }, function(err, standardSurvey) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})