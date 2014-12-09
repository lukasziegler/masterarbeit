var app = angular.module("pdsurvey", []);

app.controller("HomeController", function($scope, $http) {
	$scope.message = "Hallo Angular";

	$http.get("http://localhost:3000/api/question").success(function(response) {
		$scope.questions = response;
	}).error(function(err) {
		$scope.error = err;
	});
});