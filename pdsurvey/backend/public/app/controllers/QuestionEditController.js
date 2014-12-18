var app = angular.module("pdsurvey");

app.controller("QuestionEditController", function($scope, $http, $location, $routeParams) {
	$scope.question  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/questions/" + id).success(function(response) {
		$scope.question = response;
	});

	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveQuestion = function() {
		console.log("id: ",$scope.question._id);
		console.log("questionType: ",$scope.question.type);
		$http.put("http://localhost:3000/api/questions/" + $scope.question._id, $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	};
});