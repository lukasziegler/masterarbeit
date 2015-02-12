var app = angular.module("pdsurvey")

/** LIST **/

app.controller("StandardizedSurveyListController", function($scope, StandardizedSurvey) {
	
	// Load all entries
	StandardizedSurvey.query(function(data) {
		$scope.questionnaires = data;
	}, function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(standardizedSurvey) {
			StandardizedSurvey.delete({id: standardizedSurvey._id}, {}, function() {
				var index = $scope.questionnaires.indexOf(standardizedSurvey)
				$scope.questionnaires.splice(index, 1);     
			}, function(err) {
				$scope.error = err;
			});
	};
});
	


/** CREATE **/

app.controller("StandardizedSurveyCreateController", function($scope, $location, 
	StandardizedSurvey, Category, QuestionType) {

	$scope.questionnaire  = {"name":"", "category":"", "description":"", 
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
	$scope.categories  = {};

	// Load complementary data
	Category.query(function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});

	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createStandardQuestion = function() {
		StandardizedSurvey.save($scope.questionnaire, function() {
			$location.url("/standardizedSurveys");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("StandardizedSurveyEditController", function($scope, $location, $routeParams, 
	StandardizedSurvey, Category, QuestionType) {

	$scope.questionnaire  = {};
	var id = $routeParams.id;

	// Load data
	StandardizedSurvey.get( {id: id}, function(data) {
		$scope.questionnaire = data;

		// Replace Object with ID for Preselect to work
		if (typeof $scope.questionnaire.category != 'undefined')
			$scope.questionnaire.category = $scope.questionnaire.category._id;
	}, function(err) {
		$scope.error = err;
	});

	// Load complementary data
	Category.query(function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});

	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveStandardQuestion = function() {
		$scope.questionnaire.$update(function() {
			$location.url("/standardizedSurveys");
		}, function(err) {
			$scope.error = err;
		});
	};
});
