var Campaign = Schema.CampaignModel;
var Survey = Schema.SurveyModel;
var Response = Schema.ResponseModel;


/** 
 * CAMPAIGNS
 */ 

router.route('/campaigns')

	// GET 
	.get(function (req, res, next) {
		Campaign.find({}, function (err, campaigns) {
			if (err) {
				return next(err);
			}

			res.send(campaigns);
		});
	})

	// POST to create
	.post(function (req, res, next) {
		var newCampaign = new Campaign({
			name: req.body.name,
			launched: req.body.launched,
			description: req.body.description,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			content: req.body.content,
			location: req.body.location,
			displays: req.body.displays,
			surveys: req.body.surveys,
			contextDynamic: req.body.contextDynamic,
			minResponses: req.body.minResponses,
			numQuestionsPerPage: req.body.numQuestionsPerPage,
			createdBy: req.body.createdBy,
			dateCreated: new Date().toISOString()
		});

	    newCampaign.save(function(err) {
			if (err) { 
				return next(err);
			}
    	    return res.send(newCampaign);
	    });
	})


router.route('/campaigns/:id')

	// GET single element
	.get(function (req, res, next) {
		Campaign.findOne({ '_id': req.params.id })
		.populate('surveys displays', 'name')
		.exec(function (err, campaign) {
			if (err || !campaign) {
				return next(err);
			}

			res.send(campaign);
		});
	})

	// PUT to update
	.put(function (req, res, next) {

		return Campaign.findById( req.params.id, function (err, campaign) {
			if (err) {
				return next(err);
			}

			// update object
			campaign.name = req.body.name,
			campaign.launched = req.body.launched,
			campaign.description = req.body.description,
			campaign.startDate = req.body.startDate,
			campaign.endDate = req.body.endDate,
			campaign.content = req.body.content,
			campaign.location = req.body.location,
			campaign.displays = req.body.displays,
			campaign.surveys = req.body.surveys,
			campaign.contextDynamic = req.body.contextDynamic,
			campaign.minResponses = req.body.minResponses,
			campaign.numQuestionsPerPage = req.body.numQuestionsPerPage,
			
			campaign.launched = req.body.launched

			return campaign.save(function(err) {
				if (err) {
					return next(err);
				}
				res.send(campaign);
			})
		});

	})

	// DELETE
	.delete(function (req, res, next) {
	  // TODO implement authentication / validation
		Campaign.remove({ _id: req.params.id }, function(err, campaign) {
			if (err) {
				return next(err);
			}			
			res.send({ message: 'Successfully deleted' });
		});
	})




router.route('/campaigns/:id/questions')
	// GET all Surveys (with Questions) for specified Campaign
	.get(function (req, res, next) {
		// Load Campaign (with SurveyIDs)
		Campaign.findOne({ '_id': req.params.id })
		.select('surveys')
		.populate('surveys')	// populate with Questions
		.exec(function (err, campaign) {
			if (err || !campaign) return next(err);
			res.send(campaign);
		});
	})


router.route('/campaigns/:id/responses')
	// GET all Responses for specified Campaign
	.get(function (req, res, next) {
		// Load Campaign (with SurveyIDs)
		Response.find({ 'campaign': req.params.id })
		// .select('surveys')
		// .populate('surveys')	// populate with Questions
		.exec(function (err, campaign) {
			if (err || !campaign) return next(err);
			res.send(campaign);
		});
	})


router.route('/campaigns/:id/responses/csv')
	// CSV-Export of all Responses for specified Campaign
	.get(function (req, res, next) {

	    require('../csv-export').getResponsesCSV(req, res, req.params.id);

	})


