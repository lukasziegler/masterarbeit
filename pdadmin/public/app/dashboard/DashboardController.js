var app = angular.module("pdsurvey");


/** DASHBOARD **/

app.controller("DashboardController", function($scope, Response, Display, Campaign, Survey) {
	
	// Load Responses
	Response.query(function(data) {
		$scope.responses = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load Displays
	Display.query(function(data) {
		$scope.displays = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load Campaigns
	Campaign.query(function(data) {
		$scope.campaigns = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load number of responses per Campaign
	Response.query( {id: 'count'}, function(data) {
		$scope.campaignResponses = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load Surveys
	Survey.query(function(data) {
		$scope.surveys = data;
	}, function(err) {
		$scope.error = err;
	});
	
});