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

app.controller("CampaignCreateController", function($scope, $location, Campaign) {
	$scope.campaign  = {};

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

app.controller("CampaignEditController", function($scope, $location, $routeParams, Campaign) {
	$scope.campaign  = {};
	var id = $routeParams.id;

	// Load data
	Campaign.get( {id: id}, function(data) {
		$scope.campaign = data;
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