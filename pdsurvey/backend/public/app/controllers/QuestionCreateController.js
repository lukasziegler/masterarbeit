var app = angular.module("pdsurvey");

app.controller("QuestionCreateController", function($scope, $http, $location) {
	$scope.question  = {};

	$scope.createQuestion = function() {
		$http.post("http://localhost:3000/api/questions", $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	}
});