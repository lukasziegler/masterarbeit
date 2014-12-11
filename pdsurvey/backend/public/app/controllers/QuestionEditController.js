var app = angular.module("pdsurvey");

app.controller("QuestionEditController", function($scope, $http, $location, $routeParams) {
	$scope.question  = {};
	var id = $routeParams.id;

	$http.get("http://localhost:3000/api/questions/" + id).success(function(response) {
		$scope.question = response;
	});

	$scope.saveQuestion = function() {
		console.log("id: ",$scope.question._id);
		$http.put("http://localhost:3000/api/questions/" + $scope.question._id, $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	};
});