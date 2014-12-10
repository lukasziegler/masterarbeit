var app = angular.module("pdsurvey");

app.controller("UserListController", function($scope, $http) {
	$http.get("http://localhost:3000/api/users").success(function(response) {
		$scope.users = response;
	}).error(function(err) {
		$scope.error = err;
	});
});