var Category = Schema.CategoryModel;

/** 
 * CATEGORIES
 */ 

router.route('/categories')

	// GET 
	.get(function (req, res, next) {
		Category.find({}, function (err, categories) {
			if (err) {
				return next(err);
			}
			res.send(categories);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCategory = new Category({
			name: req.body.name,
			description: req.body.description
		});

	    newCategory.save(function(err) {
			if (err) {
				return next(err);
			}
    	    return res.send(newCategory);
	    });
	})


router.route('/categories/:id')

	// GET single element
	.get(function (req, res, next) {
		Category.findOne({ '_id': req.params.id })
		.exec(function (err, category) {
			if (err || !category) {
				return next(err);
			}
			res.send(category);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Category.findById( req.params.id, function (err, category) {
			if (err) {
				return next(err);
			}

			// update object
			category.name = req.body.name,
			category.description = req.body.description

			return category.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(category);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Category.remove({ _id: req.params.id }, function(err, category) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})
