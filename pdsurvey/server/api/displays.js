var Display = Schema.DisplayModel;
var DisplayModel = Schema.DisplayModelModel;

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

		/* DEV NOTES
		 * Not solved nicely. A better approach would be to 
		 * create a /model/displays.js with Getters/Setters
		 * and to call createDisplayModel() from here and it
		 * is finished, to call createDisplay().
		 */


		// Case 1) New DisplayModel, to be added to our DB
		if (typeof req.body.displayModel == "string") {

			// add new DisplayModel to DB
			var newDisplayModel = new DisplayModel({ name: req.body.displayModel });
		    // save to DB
		    var id = newDisplayModel.save(function(err) {
				if (err) return next(err);
				
				// save ID to model
				var newDisplay = new Display({
					name: req.body.name,
					displayModel: newDisplayModel._id,
					user: req.body.user,
					location: req.body.location,
					contextDynamic: req.body.contextDynamic
				});

			    newDisplay.save(function(err) {
			        if (err) return next(err);
		    	    return res.send(newDisplay);
			    });
		    });

		// Case 2) Normal procedure, DisplayModel already exists in DB
		} else {
			// new Display
			var newDisplay = new Display({
				name: req.body.name,
				displayModel: req.body.displayModel._id,
				user: req.body.user,
				location: req.body.location,
				contextDynamic: req.body.contextDynamic
			});

		    newDisplay.save(function(err) {
		        if (err) return next(err);
	    	    return res.send(newDisplay);
		    });
		}
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
			display.displayModel = req.body.displayModel._id,
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




router.route('/displays/user/:id')

	// GET single element
	.get(function (req, res, next) {
		Display.find({ 'user': req.params.id })
		.populate('displayModel', '_id name')
		.exec(function (err, user) {
			if (err || !user) return next(err);
			res.send(user);
		});
	})
