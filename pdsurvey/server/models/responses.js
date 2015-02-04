var Response = Schema.ResponseModel;

/** 
 * RESPONSES
 */ 

router.route('/responses')

	// GET 
	.get(function (req, res, next) {
		Response.find({}, function (err, categories) {
			if (err) {
				return next(err);
			}
			res.send(categories);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newResponse = new Response({
			question: req.body.question,
			answer: req.body.answer,
			questionnaire: req.body.questionnaire,
			display: req.body.display,
			session: req.body.session,
			timestamp: new Date().toISOString()
		});

	    newResponse.save(function(err) {
			if (err) {
				return next(err);
			}
    	    return res.send(newResponse);
	    });
	})


router.route('/responses/:id')

	// GET single element
	.get(function (req, res, next) {
		Response.findOne({ '_id': req.params.id })
		.exec(function (err, response) {
			if (err || !response) {
				return next(err);
			}

			res.send(response);
		});
	})

	// // PUT to update
	// .put(function (req, res, next) {

	// 	return Response.findById( req.params.id, function (err, response) {
	// 		if (err) {
	// 			return next(err);
	// 		}

	// 		// update object
	// 		response.name = req.body.name,
	// 		response.description = req.body.description

	// 		return response.save(function(err) {
	// 			if (err) {
	// 				return next(err);
	// 			}
	// 			res.send(response);
	// 		})
	// 	});

	// })

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Response.remove({ _id: req.params.id }, function(err, response) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})
