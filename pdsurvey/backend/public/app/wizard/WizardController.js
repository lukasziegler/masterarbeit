var wizard = angular.module('pdWizard', [])


/** CONTROLLERS **/

app.controller("WizardController", function($scope, $http, $rootScope, config) {
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
	$http.get(config.API + "displayModels").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context
	$http.get(config.API + "contexts/dynamic/").success(function(response) {
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