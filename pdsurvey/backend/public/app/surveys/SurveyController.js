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

	$scope.createSurvey = function() {
		Survey.save($scope.survey, function() {
			getSurveys();
		}, function(err) {
			$scope.error = err;
		});
	}

});



/** CREATE **/

app.controller("SurveyCreateController", function($scope, $location, Survey) {
	$scope.survey  = {};

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

app.controller("SurveyEditController", function($scope, $location, $routeParams, Survey) {
	$scope.survey  = {};
	var id = $routeParams.id;

	// Load data
	Survey.get( {id: id}, function(data) {
		$scope.survey = data;
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