var app = angular.module("pdsurvey");


/** LIST **/

app.controller("QuestionListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/questions").success(function(response) {
		$scope.questions = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(question) {
		$http.delete("http://localhost:3000/api/questions/" + question._id)
			.success(function(response) {
				var index = $scope.questions.indexOf(question)
				$scope.questions.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("QuestionCreateController", function($scope, $http, $location) {
	$scope.question  = {};

	// Load data
	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
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



/** EDIT **/

app.controller("QuestionEditController", function($scope, $http, $location, $routeParams) {
	$scope.question  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/questions/" + id).success(function(response) {
		$scope.question = response;

		if (typeof $scope.question.type != 'undefined')
			$scope.question.type = $scope.question.type._id;

		if (typeof $scope.question.category != 'undefined')
			$scope.question.category = $scope.question.category._id;
	});

	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveQuestion = function() {
		$http.put("http://localhost:3000/api/questions/" + $scope.question._id, $scope.question)
			.success(function(response) {
				$location.url("/questions");
			});
	};
});