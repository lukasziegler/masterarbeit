var app = angular.module("pdsurvey");

app.controller("QuestionTypeCreateController", function($scope, $http, $location) {
	$scope.questionType  = {};

	$scope.createQuestionType = function() {
		$http.post("http://localhost:3000/api/questionTypes", $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	}
});