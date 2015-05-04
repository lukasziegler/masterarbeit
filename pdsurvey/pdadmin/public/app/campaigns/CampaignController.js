var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CampaignListController", function($scope, Campaign, config) {

	$scope.frontendURL = config.frontend;

	// Load all entries
	Campaign.query(function(data) {
		$scope.campaigns = data;
	}, function(err) {
		$scope.error = err;
	});

	// Delete selected entry
	$scope.deleteCampaign = function(campaign) {
		Campaign.delete({id: campaign._id}, {}, function() {
			var index = $scope.campaigns.indexOf(campaign)
			$scope.campaigns.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

	// Launch Campaign
	$scope.toggleCampaignLaunched = function(campaign) {

		// launch
		if (campaign.launched == false)
			campaign.launched = true;
		else 
			campaign.launched = false;

		// update object
		campaign.$update(function(success) {}, function(err) {
			$scope.error = err;
		});
	}

});



/** CREATE **/

app.controller("CampaignCreateController", function($scope, $rootScope, $location, Campaign, Context) {
	$scope.campaign  = {};
	$scope.campaign.createdBy = $rootScope.userId;

	// TEMP TEMP (for development purposes)
	$scope.campaign.display = "54d1e7c3ef96bc690dd19974";
	$scope.campaign.survey = "54a9344c04d9e425198b33bc";
	// TEMP TEMP TEMP

	// Load Context (for Autocomplete)
	Context.getDynamic(function(data) {
		$scope.dynamicContexts = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createCampaign = function() {
		$scope.campaign.contextDynamic = $scope.contextDynamic;

		Campaign.save($scope.campaign, function() {
			$location.url("/campaigns");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("CampaignEditController", function($scope, $rootScope, $location, $routeParams, 
	Campaign, Context, config) {

	$scope.campaign  = {};
	$scope.campaign.createdBy = $rootScope.userId;
	var id = $routeParams.id;
	$scope.campaignURL = "generating ...";
	$scope.embedCode = "loading ...";


	// Load data
	Campaign.get( {id: id}, function(data) {
		$scope.campaign = data;

		// copy values to temporary 
		$scope.contextDynamic = $scope.campaign.contextDynamic;
		$scope.campaign.contextDynamic = $scope.campaign.contextDynamic._id;
		$scope.campaignURL = config.frontend + "/campaign/" + $scope.campaign._id;

		// update EmbedCode
		$scope.embedCode = Campaign.getEmbedCode(data._id);
		
	}, function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	Context.getDynamic(function(data) {
		$scope.dynamicContexts = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveCampaign = function() {
		$scope.campaign.$update(function() {
			$location.url("/campaigns");
		}, function(err) {
			$scope.error = err;
		});
	};
});



/** RESPONSES (+CSV Export) **/

app.controller("CampaignResponseController", function($scope, $routeParams, Campaign, CampaignResponse) {
	
	var id = $routeParams.id;

	// Load Campaign details
	Campaign.get( {id: id}, function(data) {
		$scope.campaign = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load all Responses
	CampaignResponse.query( {id: id}, function(data) {
		$scope.responses = data;
	}, function(err) {
		$scope.error = err;
	});

});



