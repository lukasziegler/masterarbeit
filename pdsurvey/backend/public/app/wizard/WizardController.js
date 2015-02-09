var wizard = angular.module('pdWizard', [])


/* * * * * * * */
/** DIRECTIVES */
/* * * * * * * */

.directive('pdNextTab', function() {
	return {
		restrict: 'A',
		replace: true,
		template:  '<div class="row">'+
					    '<div class="col-lg-12" style="padding-bottom: 1.5em;">'+
					     '   <a href="" class="btn btn-default" ng-click="prevPill()" ng-hide="prevPillShow()">Previous Step</a>'+
						 '   <a href="" class="btn btn-success pull-right" ng-click="nextPill()" ng-hide="nextPillShow()">Next Step</a>'+
					    '</div>'+
					'</div>',
		link: function(scope, elem, attrs) {

			scope.prevPillShow = function() {
				return scope.tabs.activeTab == 0;
			}
			scope.nextPillShow = function() {
				return scope.tabs.activeTab == scope.tabs.length-1;
			}


			scope.prevPill = function() {
				if (scope.prevPillShow())
					alert("End of Pills");
				else
					scope.tabs.activeTab--;
			}

			scope.nextPill = function() {
				if (scope.nextPillShow())
					alert("End of Pills");
				else
					scope.tabs.activeTab++;
			}
		}
	};
})


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
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeDisplay(myDisplay)" title="Remove Display"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.removeDisplay = function(display) {
				var indexDisplay = scope.myDisplays.indexOf(display);
				scope.myDisplays.splice(indexDisplay, 1);     
			};
		}
	};
})

/* * * * * * * * */
/** CONTROLLERS **/
/* * * * * * * * */

.controller("WizardController", function($scope, $http, $rootScope, config) {
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

	$http.get(config.API + "users/" + $rootScope.userId + '/displays').success(function(response) {
		$scope.myDisplays = response;
	}).error(function(err) {
		$scope.error = err;
	});


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