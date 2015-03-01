var app = angular.module("pdsurvey");


/** LIST **/

app.controller("QuestionListController", function($scope, Question) {
	
	// Load all entries
	Question.query(function(data) {
		$scope.questions = data;
	}, function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(question) {
		Question.delete({id: question._id}, {}, function() {
			var index = $scope.questions.indexOf(question)
			$scope.questions.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

});



/** CREATE **/

app.controller("QuestionCreateController", function($scope, $location, 
	Question, QuestionType, Category) {

	$scope.question  = {};

	// Load supplementary data
	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	}, function(err) {
		$scope.error = err;
	});

	Category.query(function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createQuestion = function() {
		Question.save($scope.question, function() {
			$location.url("/questions");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("QuestionEditController", function($scope, $location, $routeParams, 
	Question, QuestionType, Category) {

	$scope.question  = {};
	var id = $routeParams.id;

	// Load data
	Question.get( {id: id}, function(data) {
		$scope.question = data;

		if (typeof $scope.question.type != 'undefined')
			$scope.question.type = $scope.question.type._id;

		if (typeof $scope.question.category != 'undefined')
			$scope.question.category = $scope.question.category._id;

	}, function(err) {
		$scope.error = err;
	});

	// Load supplementary data
	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	}, function(err) {
		$scope.error = err;
	});

	Category.query(function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveQuestion = function() {
		$scope.question.$update(function() {
			$location.url("/questions");
		}, function(err) {
			$scope.error = err;
		});
	};
});