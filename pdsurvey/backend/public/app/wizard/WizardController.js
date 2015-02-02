var app = angular.module("pdsurvey")


/** DIRECTIVES **/

.directive('pdAddDisplay', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default" type="button" ng-click="addDisplay()" title="Add Display"><i class="fa fa-plus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.addDisplay = function() {

				var name = scope.newDisplay.name;
				var model = scope.newDisplay.type;

				if (name != undefined && model != undefined) {

					// update model
					scope.myDisplays.push( {"name": name,
						"type": model});

					// TODO save to REST / DB

					// clear old values
					scope.newDisplay.name = "";
					scope.newDisplay.type = {};
				}
				else {
					alert("Empty fields");
					// TODO show notification in form fields
				}
			}
		}
	};
})


.directive('pdRemoveDisplay', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeDisplay(display)" title="Remove Display"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.removeDisplay = function(display) {
				var indexDisplay = scope.myDisplays.indexOf(display);
				scope.myDisplays.splice(indexDisplay, 1);     
			};
		}
	};
})


/** CONTROLLERS **/

app.controller("WizardController", function($scope, $http) {
	// Tabs for Wizard
	$scope.tabs = [
		{title:'Display', template: '/app/wizard/templates/_display.html',},
		{title:'Survey', template: '/app/wizard/templates/_survey.html'},
		{title:'Campaign', template: '/app/wizard/templates/_campaign.html'},
		{title:'Embed Code', template: '/app/wizard/templates/_embedCode.html'}
	];
	$scope.tabs.activeTab = 0;

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


})