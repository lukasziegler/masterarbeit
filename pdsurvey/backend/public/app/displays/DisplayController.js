var app = angular.module("pdsurvey")


/** DIRECTIVES **/
.directive('pdAddContext', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="addContext(display.contextDynamic)" class="btn btn-default"><i class="fa fa-plus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.addContext = function(newContext) {
			scope.contextList.push(newContext);
		}

		}
	};
})


/** LIST **/

app.controller("DisplayListController", function($scope, $http, config) {
	
	$http.get(config.API + "displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteDisplay = function(display) {
		$http.delete(config.API + "displays/" + display._id)
			.success(function(response) {
				var index = $scope.displays.indexOf(display)
				$scope.displays.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("DisplayCreateController", function($scope, $http, $location, config) {
	$scope.display  = {};
	$scope.contexts  = {};
	$scope.contextList  = [];

	// TEMPORARY
		$scope.display.user = "54a6b51a276762fc510bb0f0";
	// TEMPORARY

	// Load Display Models (for Autocomplete)
	$http.get(config.API + "displayModels/").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	$http.get(config.API + "contexts/dynamic/").success(function(response) {
		$scope.contexts = response;
	}).error(function(err) {
		$scope.error = err;
	});


	// Save data
	$scope.createDisplay = function() {
		$http.post(config.API + "displays/", $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	}


	// $scope.addContext = function(newContext) {
	// 	$scope.contextList.push(newContext);
	// }

});



/** EDIT **/

app.controller("DisplayEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.display  = {};
	var id = $routeParams.id;

	
	// TEMPORARY
		$scope.display.user = "54a6b51a276762fc510bb0f0";
	// TEMPORARY


	// Load Display Models
	$http.get(config.API + "displayModels/").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load context for Autocomplete
	$scope.contexts  = {};
	$scope.contextList  = [];
	$http.get(config.API + "contexts/dynamic/")
		.success(function(response) {
			$scope.contexts = response;
		}).error(function(err) {
			$scope.error = err;
		});
		$scope.addContext = function(newContext) {
			$scope.contextList.push(newContext);
		}

	// Save data
	$scope.saveDisplay = function() {
		$http.put(config.API + "displays/" + $scope.display._id, $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	};
});