var app = angular.module("pdsurvey");


/** LIST **/

app.controller("DisplayListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteDisplay = function(display) {
		$http.delete("http://localhost:3000/api/displays/" + display._id)
			.success(function(response) {
				var index = $scope.displays.indexOf(display)
				$scope.displays.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("DisplayCreateController", function($scope, $http, $location) {
	$scope.display  = {};

	// Save data
	$scope.createDisplay = function() {
		$http.post("http://localhost:3000/api/displays", $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	}
});



/** EDIT **/

app.controller("DisplayEditController", function($scope, $http, $location, $routeParams) {
	$scope.display  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/displays/" + id).success(function(response) {
		$scope.display = response;
	});

	// Save data
	$scope.saveDisplay = function() {
		$http.put("http://localhost:3000/api/displays/" + $scope.display._id, $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	};
});