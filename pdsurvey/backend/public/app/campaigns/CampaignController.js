var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CampaignListController", function($scope, $http, config) {

	$http.get(config.API + "campaigns/").success(function(response) {
		$scope.campaigns = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteCampaign = function(campaign) {
		$http.delete(API_URL + "campaigns/" + campaign._id)
			.success(function(response) {
				var index = $scope.campaigns.indexOf(campaign)
				$scope.campaigns.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("CampaignCreateController", function($scope, $http, $location, config) {
	$scope.campaign  = {};

	// Save data
	$scope.createCampaign = function() {
		$http.post(config.API + "campaigns/", $scope.campaign)
			.success(function(response) {
				$location.url("/campaigns");
			});
	}
});



/** EDIT **/

app.controller("CampaignEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.campaign  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "campaigns/" + id).success(function(response) {
		$scope.campaign = response;
	});

	// Save data
	$scope.saveCampaign = function() {
		$http.put(config.API + "campaigns/" + $scope.campaign._id, $scope.campaign)
			.success(function(response) {
				$location.url("/campaigns");
			});
	};
});