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
					scope.myDisplays.push( {"name": name,
						"type": model});
					console.log("Submitted fields", name, model);
				}
				else {
					alert("Empty fields");
					console.log("Empty fields", name, model);
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
	$scope.myDisplays = [];

	// Load Displays
	$http.get("http://localhost:3000/api/displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context
	$http.get("http://localhost:3000/api/contexts?type=dynamic").success(function(response) {
		$scope.dynamicContext = response;
	}).error(function(err) {
		$scope.error = err;
	});


	$scope.addNewDisplay = function() {
		alert("TODO");
	}

})