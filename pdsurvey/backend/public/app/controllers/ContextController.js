var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ContextListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/contexts").success(function(response) {
		$scope.contexts = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteContext = function(context) {
		$http.delete("http://localhost:3000/api/contexts/" + context._id)
			.success(function(response) {
				var index = $scope.contexts.indexOf(context)
				$scope.contexts.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("ContextCreateController", function($scope, $http, $location) {
	$scope.context  = {
		type: 'undefined'
	};

$scope.button = {
toggle: false,
checkbox: {left: false, middle: true, right: false},
radio: 'left'
};

	// Save data
	$scope.createContext = function() {
console.log($scope.context);

		$http.post("http://localhost:3000/api/contexts", $scope.context)
			.success(function(response) {
				$location.url("/contexts");
			});
	}
});



/** EDIT **/

app.controller("ContextEditController", function($scope, $http, $location, $routeParams) {
	$scope.context  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/contexts/" + id).success(function(response) {
		$scope.context = response;
	});

	// Save data
	$scope.saveContext = function() {
		$http.put("http://localhost:3000/api/contexts/" + $scope.context._id, $scope.context)
			.success(function(response) {
				$location.url("/contexts");
			});
	};
});