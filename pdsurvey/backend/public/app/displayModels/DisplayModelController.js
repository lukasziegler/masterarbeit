var app = angular.module("pdsurvey");


/** LIST **/

app.controller("DisplayModelListController", function($scope, $http, config) {
	
	$http.get(config.API + "displayModels").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteDisplayModel = function(displayModel) {
		$http.delete(config.API + "displayModels/" + displayModel._id)
			.success(function(response) {
				var index = $scope.displayModels.indexOf(displayModel)
				$scope.displayModels.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("DisplayModelCreateController", function($scope, $http, $location, config) {
	$scope.displayModel  = {};
	$scope.contexts  = {};
	$scope.contextList  = [];

	// Save data
	$scope.createDisplayModel = function() {
		$http.post(config.API + "displayModels", $scope.displayModel)
			.success(function(response) {
				$location.url("/displayModels");
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

app.controller("DisplayModelEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.displayModel  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "displayModels/" + id).success(function(response) {
		$scope.displayModel = response;
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
	$scope.saveDisplayModel = function() {
		$http.put(config.API + "displayModels/" + $scope.displayModel._id, $scope.displayModel)
			.success(function(response) {
				$location.url("/displayModels");
			});
	};
});