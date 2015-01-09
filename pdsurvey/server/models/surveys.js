var Survey = Schema.SurveyModel;

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