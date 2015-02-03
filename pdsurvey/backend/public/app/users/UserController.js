var app = angular.module("pdsurvey");


/** LIST **/

app.controller("UserListController", function($scope, $http, config) {
	
	$http.get(config.API + "users").success(function(response) {
		$scope.users = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteUser = function(user) {
		$http.delete(config.API + "users/" + user._id)
			.success(function(response) {
				var index = $scope.users.indexOf(user)
				$scope.users.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("UserCreateController", function($scope, $http, $location, config) {
	$scope.user  = {};

	// Save data
	$scope.createUser = function() {
		$http.post(config.API + "users", $scope.user)
			.success(function(response) {
				$location.url("/users");
			});
	}
});



/** EDIT **/

app.controller("UserEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.user  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "users/" + id).success(function(response) {
		$scope.user = response;
	});

	// Save data
	$scope.saveUser = function() {
		$http.put(config.API + "users/" + $scope.user._id, $scope.user)
			.success(function(response) {
				$location.url("/users");
			});
	};
});