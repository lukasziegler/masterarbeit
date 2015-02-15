var app = angular.module("pdsurvey");


/** LIST **/

app.controller("SurveyListController", function($scope, $location, Survey) {
	$scope.survey  = {};

	getSurveys();

	// Load all entries
	function getSurveys() {
		Survey.query(function(data) {
			$scope.surveys = data;
		}, function(err) {
			$scope.error = err;
		});
	}

	$scope.deleteSurvey = function(survey) {
		Survey.delete({id: survey._id}, {}, function() {
			var index = $scope.surveys.indexOf(survey)
			$scope.surveys.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

});



/** CREATE **/

app.controller("SurveyCreateController", function($scope, $location, 
	Survey, Category, QuestionType) {

	$scope.survey  = {"name":"", "category":"", "description":"", 
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
	$scope.createSurvey = function() {
		Survey.save($scope.survey, function() {
			$location.url("/surveys");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("SurveyEditController", function($scope, $location, $routeParams, 
	Survey, Category, QuestionType) {

	$scope.survey  = {};
	var id = $routeParams.id;

	// Load data
	Survey.get( {id: id}, function(data) {
		$scope.survey = data;

		// Replace Object with ID for Preselect to work
		if (typeof $scope.survey.category != 'undefined')
			$scope.survey.category = $scope.survey.category._id;
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
	$scope.saveSurvey = function() {
		$scope.survey.$update(function() {
			$location.url("/surveys");
		}, function(err) {
			$scope.error = err;
		});
	};
});