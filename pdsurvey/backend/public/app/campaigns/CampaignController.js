var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CampaignListController", function($scope, Campaign) {

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

});



/** CREATE **/

app.controller("CampaignCreateController", function($scope, $rootScope, $location, Campaign) {
	$scope.campaign  = {};
	$scope.campaign.createdBy = $rootScope.userId;

	$scope.campaign.display = "54d1e7c3ef96bc690dd19974";
	$scope.campaign.survey = "54a9344c04d9e425198b33bc";

	// Save data
	$scope.createCampaign = function() {
		Campaign.save($scope.campaign, function() {
			$location.url("/campaigns");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("CampaignEditController", function($scope, $rootScope, $location, $routeParams, Campaign) {
	$scope.campaign  = {};
	$scope.campaign.createdBy = $rootScope.userId;
	var id = $routeParams.id;

	// Load data
	Campaign.get( {id: id}, function(data) {
		$scope.campaign = data;
		console.log(data)
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveCampaign = function() {
		console.log("saved", $scope.campaign)
		$scope.campaign.$update(function() {
			$location.url("/campaigns");
		}, function(err) {
			$scope.error = err;
		});
	};
});