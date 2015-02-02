var app = angular.module("pdsurvey")


/** CONTROLLERS **/

app.controller("WizardController", function($scope, $http, $rootScope) {
	// Tabs for Wizard
	$scope.tabs = [
		{title:'Display', template: '/app/wizard/templates/_display.html',},
		{title:'Survey', template: '/app/wizard/templates/_survey.html'},
		{title:'Campaign', template: '/app/wizard/templates/_campaign.html'},
		{title:'Embed Code', template: '/app/wizard/templates/_embedCode.html'}
	];
	$scope.tabs.activeTab = 0;


	/*** 1) DISPLAY ***/
	$scope.myDisplays = [];

	// Load Displays
	$http.get("http://localhost:3000/api/displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context
	$http.get("http://localhost:3000/api/contexts/dynamic").success(function(response) {
		$scope.dynamicContext = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.addNewDisplay = function() {
		alert("TODO");
	}


	/*** 2) SURVEY ***/


	/*** 3) CAMPAIGN ***/


	/*** 4) EMBED CODE ***/



})