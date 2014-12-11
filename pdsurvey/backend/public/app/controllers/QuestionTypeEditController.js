var app = angular.module("pdsurvey");

app.controller("QuestionTypeEditController", function($scope, $http, $location, $routeParams) {
	$scope.questionType  = {};
	var id = $routeParams.id;

	$http.get("http://localhost:3000/api/questionTypes/" + id).success(function(response) {
		$scope.questionType = response;
	});

	$scope.saveQuestionType = function() {
		console.log("id: ",$scope.questionType._id);
		$http.put("http://localhost:3000/api/questionTypes/" + $scope.questionType._id, $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	};
});