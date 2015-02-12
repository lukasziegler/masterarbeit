var Context = Schema.ContextModel;

/** 
 * CONTEXTS
 */ 

router.route('/contexts')

	// GET 
	.get(function (req, res, next) {
		Context.find({}, function (err, contexts) {
			if (err) {
				return next(err);
			}
			res.send(contexts);
		});
	})

	// POST to create
	.post(function (req, res, next) {

		var newContext = new Context({
			type: req.body.type,
			name: req.body.name
		});

		console.log("DEBUG", newContext)

	    newContext.save(function(err) {
			if (err) {
				return next(err);
			}
    	    return res.send(newContext);
	    });
	})


router.route('/contexts/dynamic')
	// GET 
	.get(function (req, res, next) {
		Context.find({ type: 'dynamic' })
		.select('-type')
		.exec(function (err, contexts) {
			if (err) {
				return next(err);
			}
			res.send(contexts);
		});
	})

router.route('/contexts/static')
	// GET 
	.get(function (req, res, next) {
		Context.find({ type: 'static' })
		.select('-type')
		.exec(function (err, contexts) {
			if (err) {
				return next(err);
			}
			res.send(contexts);
		});
	})


router.route('/contexts/:id')

	// GET single element
	.get(function (req, res, next) {
		Context.findOne({ '_id': req.params.id })
		.exec(function (err, context) {
			if (err || !context) {
				return next(err);
			}
			res.send(context);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Context.findById( req.params.id, function (err, context) {
			if (err) {
				return next(err);
			}

			// update object
			context.type = req.body.type,
			context.name = req.body.name

			return context.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(context);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
		Context.remove({ _id: req.params.id }, function(err, context) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})


