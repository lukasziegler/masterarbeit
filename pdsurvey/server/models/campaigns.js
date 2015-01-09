var Campaign = Schema.CampaignModel;

/** 
 * CAMPAIGNS
 */ 

router.route('/campaigns')

	// GET 
	.get(function (req, res, next) {
		Campaign.find({}, function (err, campaigns) {
			if (err) return console.error(err);
			res.send(campaigns);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCampaign = new Campaign({
			name: req.body.name,
			description: req.body.description,
			display: req.body.display,
			survey: req.body.survey,
			contextDynamic: req.body.contextDynamic,
			minResponses: req.body.minResponses,
			createdBy: req.body.createdBy,
			dateCreated: new Date().toISOString()
		});

	    newCampaign.save(function(err) {
	        if (err) {
	        	res.send('Error creating object');
	            return console.error(err);
	        }
    	    return res.send(newCampaign);
	    });
	})


router.route('/campaigns/:id')

	// GET single element
	.get(function (req, res, next) {
		Campaign.findOne({ '_id': req.params.id })
		.exec(function (err, campaign) {
			if (err || !campaign) return console.error(err);
			res.send(campaign);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Campaign.findById( req.params.id, function (err, campaign) {
			if (err) {
				res.send('error updating');
				return console.error(err);
			}

			// update object
			campaign.name = req.body.name,
			campaign.description = req.body.description,
			campaign.startDate = new Date().toISOString(),
			campaign.endDate = new Date().toISOString(),
			campaign.display = req.body.display,
			campaign.survey = req.body.survey,
			campaign.contextDynamic = req.body.contextDynamic,
			campaign.minResponses = req.body.minResponses

			return campaign.save(function(err) {
				if (err) {
					res.send('Error updating, e.g. invalid mapping');
					return console.error(err);
				}
				res.send(campaign);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Campaign.remove({ _id: req.params.id }, function(err, campaign) {
			if (err) return console.error(err);
			
			res.send({ message: 'Successfully deleted' });
		});
	})
