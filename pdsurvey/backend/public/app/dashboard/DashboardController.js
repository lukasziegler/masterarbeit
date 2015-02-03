var app = angular.module("pdsurvey");


/** DASHBOARD **/

app.controller("DashboardController", function($scope, $http, config) {
	
	$scope.message = "new User";

	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestionType = function(questionType) {
		$http.delete(config.API + "questionTypes/" + questionType._id)
			.success(function(response) {
				var index = $scope.questionTypes.indexOf(questionType)
				$scope.questionTypes.splice(index, 1);     
			});
	};

	// Load Responses
	$http.get(config.API + "responses").success(function(response) {
		$scope.responses = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Displays
	$http.get(config.API + "displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});
	
});