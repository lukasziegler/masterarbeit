var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ContextListController", function($scope, $http, config) {
	
	$http.get(config.API + "contexts").success(function(response) {
		$scope.contexts = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteContext = function(context) {
		$http.delete(config.API + "contexts/" + context._id)
			.success(function(response) {
				var index = $scope.contexts.indexOf(context)
				$scope.contexts.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("ContextCreateController", function($scope, $http, $location, config) {
	$scope.context  = {};

	// Save data
	$scope.createContext = function() {
		$http.post(config.API + "contexts", $scope.context)
			.success(function(response) {
				$location.url("/contexts");
			});
	}
});



/** EDIT **/

app.controller("ContextEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.context  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "contexts/" + id).success(function(response) {
		$scope.context = response;
	});

	// Save data
	$scope.saveContext = function() {
		$http.put(config.API + "contexts/" + $scope.context._id, $scope.context)
			.success(function(response) {
				$location.url("/contexts");
			});
	};
});