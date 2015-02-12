var app = angular.module("pdsurvey");


/** DASHBOARD **/

app.controller("DashboardController", function($scope, Response, Display) {
	
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
	
});