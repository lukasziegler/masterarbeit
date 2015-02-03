var app = angular.module("pdsurvey");


/** LIST **/

app.controller("QuestionListController", function($scope, $http, config) {
	
	$http.get(config.API + "questions").success(function(response) {
		$scope.questions = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(question) {
		$http.delete(config.API + "questions/" + question._id)
			.success(function(response) {
				var index = $scope.questions.indexOf(question)
				$scope.questions.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("QuestionCreateController", function($scope, $http, $location, config) {
	$scope.question  = {};

	// Load data
	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createQuestion = function() {
		$http.post(config.API + "questions", $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	}
});



/** EDIT **/

app.controller("QuestionEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.question  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "questions/" + id).success(function(response) {
		$scope.question = response;

		if (typeof $scope.question.type != 'undefined')
			$scope.question.type = $scope.question.type._id;

		if (typeof $scope.question.category != 'undefined')
			$scope.question.category = $scope.question.category._id;
	});

	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveQuestion = function() {
		$http.put(config.API + "questions/" + $scope.question._id, $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	};
});