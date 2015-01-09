var Context = Schema.ContextModel;

/** 
 * CONTEXTS
 */ 

router.route('/contexts')

	// GET 
	.get(function (req, res, next) {
		Context.find({}, function (err, contexts) {
			if (err) return console.error(err);
			res.send(contexts);
		});
	})

	// POST to create
	.post(function (req, res, next) {

		var newContext = new Context({
			type: req.body.type,
			context: req.body.context
		});

		console.log("DEBUG", newContext)

	    newContext.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newContext);
	    });
	})


router.route('/contexts/:id')

	// GET single element
	.get(function (req, res, next) {
		Context.findOne({ '_id': req.params.id })
		.exec(function (err, context) {
			if (err || !context) return console.error(err);
			res.send(context);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Context.findById( req.params.id, function (err, context) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			context.type = req.body.type,
			context.context = req.body.context

			return context.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(context);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		Context.remove({ _id: req.params.id }, function(err, context) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})
