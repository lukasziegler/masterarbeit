var Display = Schema.DisplayModel;

/** 
 * DISPLAYS
 */ 

router.route('/displays')

	// GET 
	.get(function (req, res, next) {
		Display.find({})
		.populate('displayModel', '_id name')
		.exec(function (err, displays) {
			if (err) {
				return next(err);
			}
			
			res.send(displays);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newDisplay = new Display({
			name: req.body.name,
			displayModel: req.body.displayModel,
			user: req.body.user,
			location: req.body.location,
			contextDynamic: req.body.contextDynamic
		});

	    newDisplay.save(function(err) {
	        if (err) {
	        	return next(err);
	        }

    	    return res.send(newDisplay);
	    });
	})


router.route('/displays/:id')

	// GET single element
	.get(function (req, res, next) {
		Display.findOne({ '_id': req.params.id })
		.populate('displayModel', '_id name')
		.exec(function (err, display) {
			if (err || !display) return next(err);
			res.send(display);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Display.findById( req.params.id, function (err, display) {

			if (err) return next(err);

			// update object
			display.name = req.body.name,
			display.displayModel = req.body.displayModel,
			display.user = req.body.user,
			display.location = req.body.location,
			display.contextDynamic = req.body.contextDynamic

			return display.save(function(err) {
				if (err) {
					next(err);
					return;
				}
			
				res.send(display);
			
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		Display.remove({ _id: req.params.id }, function(err, display) {

			if (err) return next(err);			

			res.send({ message: 'Successfully deleted' });
			
		});
	})
