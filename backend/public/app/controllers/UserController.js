var app = angular.module("pdsurvey");


/** LIST **/

app.controller("UserListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/users").success(function(response) {
		$scope.users = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteUser = function(user) {
		$http.delete("http://localhost:3000/api/users/" + user._id)
			.success(function(response) {
				var index = $scope.users.indexOf(user)
				$scope.users.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("UserCreateController", function($scope, $http, $location) {
	$scope.user  = {};

	// Save data
	$scope.createUser = function() {
		$http.post("http://localhost:3000/api/users", $scope.user)
			.success(function(response) {
				$location.url("/users");
			});
	}
});



/** EDIT **/

app.controller("UserEditController", function($scope, $http, $location, $routeParams) {
	$scope.user  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/users/" + id).success(function(response) {
		$scope.user = response;
	});

	// Save data
	$scope.saveUser = function() {
		$http.put("http://localhost:3000/api/users/" + $scope.user._id, $scope.user)
			.success(function(response) {
				$location.url("/users");
			});
	};
});