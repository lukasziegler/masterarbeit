var DisplayModel = Schema.DisplayModelModel;

/** 
 * DISPLAYS
 */ 

router.route('/displayModels')

	// GET 
	.get(function (req, res, next) {
		DisplayModel.find({}, function (err, displayModels) {
			if (err) return console.error(err);
			res.send(displayModels);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newDisplayModel = new DisplayModel({
			name: req.body.name,
			producer: req.body.producer,
			url: req.body.url,
			characteristics: req.body.characteristics,
			contextStatic: req.body.contextStatic
		});

	    newDisplayModel.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newDisplayModel);
	    });
	})


router.route('/displayModels/:id')

	// GET single element
	.get(function (req, res, next) {
		DisplayModel.findOne({ '_id': req.params.id })
		.exec(function (err, display) {
			if (err || !display) return console.error(err);
			res.send(display);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return DisplayModel.findById( req.params.id, function (err, display) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			display.name = req.body.name,
			display.producer = req.body.producer,
			display.url = req.body.url,
			display.characteristics = req.body.characteristics,
			display.contextStatic = req.body.contextStatic

			return display.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(display);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		DisplayModel.remove({ _id: req.params.id }, function(err, display) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})
