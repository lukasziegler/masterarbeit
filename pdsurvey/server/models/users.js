var User = Schema.UserModel;

/** 
 * USERS
 */ 

router.route('/users')

	// GET 
	.get(function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) return next(err);
			res.send(users);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newUser = new User({
			username: req.body.username,
			fullname: req.body.fullname,
			email: req.body.email
		});

	    newUser.save(function(err) {
	        if (err) {
	        	return next(err);
	        }
    	    return res.send(newUser);
	    });
	})


router.route('/users/:id')

	// GET single element
	.get(function (req, res, next) {
		User.findOne({ '_id': req.params.id })
		.exec(function (err, user) {
			if (err || !user) return next(err);
			res.send(user);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return User.findById( req.params.id, function (err, user) {
			if (err) {
				return next(err);
			}

			// update object
			user.username = req.body.username,
			user.fullname = req.body.fullname,
			user.email = req.body.email

			return user.save(function(err) {
				if (err) return next(err);
				res.send(user);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		User.remove({ _id: req.params.id }, function(err, user) {
			if (err) return next(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})