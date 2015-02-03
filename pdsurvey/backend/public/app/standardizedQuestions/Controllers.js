var app = angular.module("pdsurvey")

/** LIST **/

app.controller("StandardizedQuestionListController", function($scope, $http, config) {
	
	$http.get(config.API + "standardSurvey").success(function(response) {
		$scope.questionnaires = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(standardizedQuestion) {
		$http.delete(config.API + "standardSurvey/" + standardizedQuestion._id)
			.success(function(response) {
				var index = $scope.questionnaires.indexOf(standardizedQuestion)
				$scope.questionnaires.splice(index, 1);     
			});
	};

});
	


/** CREATE **/

app.controller("StandardizedQuestionCreateController", function($scope, $http, $location, config) {
	$scope.questionnaire  = {"name":"", "category":"", "description":"", 
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
	$scope.categories  = {};

	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createStandardQuestion = function() {
		$http.post(config.API + "standardSurvey", $scope.questionnaire)
			.success(function(response) {
				$location.url("/standardizedQuestions");
			});
	}
});



/** EDIT **/

app.controller("StandardizedQuestionEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.questionnaire  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "standardSurvey/" + id).success(function(response) {
		$scope.questionnaire = response;

		// Replace Object with ID for Preselect to work
		if (typeof $scope.questionnaire.category != 'undefined')
			$scope.questionnaire.category = $scope.questionnaire.category._id;
	});

	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveStandardQuestion = function() {
		$http.put(config.API + "standardSurvey/" + $scope.questionnaire._id, $scope.questionnaire)
			.success(function(response) {
				$location.url("/standardizedQuestions");
			});
	};
});
