var app = angular.module("pdsurvey");

app.controller("QuestionCreateController", function($scope, $http, $location) {
	$scope.question  = {};

	// Load data
	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createQuestion = function() {
		$http.post("http://localhost:3000/api/questions", $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	}
});