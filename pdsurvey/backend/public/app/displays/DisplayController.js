var app = angular.module("pdsurvey");


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

	// Save data
	$scope.createDisplay = function() {
		$http.post(config.API + "displays", $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	}

	// Load context for Autocomplete
	$http.get(config.API + "contexts")
		.success(function(response) {
			$scope.contexts = response;
		}).error(function(err) {
			$scope.error = err;
		});

	$scope.addContext = function(newContext) {
		$scope.contextList.push(newContext);
	}

});



/** EDIT **/

app.controller("DisplayEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.display  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "displays/" + id).success(function(response) {
		$scope.display = response;
	});

	// Load context for Autocomplete
	$scope.contexts  = {};
	$scope.contextList  = [];
	$http.get(config.API + "contexts")
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