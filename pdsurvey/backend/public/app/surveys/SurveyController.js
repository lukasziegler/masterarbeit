var app = angular.module("pdsurvey");


/** LIST **/

app.controller("SurveyListController", function($scope, $http, $location, config) {
	$scope.survey  = {};

	
	$http.get(config.API + "surveys").success(function(response) {
		$scope.surveys = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteSurvey = function(survey) {
		$http.delete(config.API + "surveys/" + survey._id)
			.success(function(response) {
				var index = $scope.surveys.indexOf(survey)
				$scope.surveys.splice(index, 1);     
			});
	};

	$scope.createSurvey = function() {
		$http.post(config.API + "surveys", $scope.survey)
			.success(function(response) {
				$location.url("/surveys/#");
			});
	}

});



/** CREATE **/

app.controller("SurveyCreateController", function($scope, $http, $location, config) {
	$scope.survey  = {};

	// Load data
	// $http.get(config.API + "questionTypes").success(function(response) {
	// 	$scope.questionTypes = response;
	// }).error(function(err) {
	// 	$scope.error = err;
	// });

	// Save data
	$scope.createSurvey = function() {
		$http.post(config.API + "surveys", $scope.survey)
			.success(function(response) {
				$location.url("/surveys");
			});
	}
});



/** EDIT **/

app.controller("SurveyEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.survey  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "surveys/" + id).success(function(response) {
		$scope.survey = response;
	});

	// $http.get(config.API + "questionTypes").success(function(response) {
	// 	$scope.questionTypes = response;
	// }).error(function(err) {
	// 	$scope.error = err;
	// });

	// Save data
	$scope.saveSurvey = function() {
		$http.put(config.API + "surveys/" + $scope.survey._id, $scope.survey)
			.success(function(response) {
				$location.url("/surveys");
			});
	};
});