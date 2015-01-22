var app = angular.module("pdsurvey");


/** DASHBOARD **/

app.controller("DashboardController", function($scope, $http) {
	
	$scope.message = "new User";

	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestionType = function(questionType) {
		$http.delete("http://localhost:3000/api/questionTypes/" + questionType._id)
			.success(function(response) {
				var index = $scope.questionTypes.indexOf(questionType)
				$scope.questionTypes.splice(index, 1);     
			});
	};

	// Load Responses
	$http.get("http://localhost:3000/api/responses").success(function(response) {
		$scope.responses = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Displays
	$http.get("http://localhost:3000/api/displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});
	
});