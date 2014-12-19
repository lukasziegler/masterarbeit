var app = angular.module("pdsurvey");


/** LIST **/

app.controller("SurveyListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/surveys").success(function(response) {
		$scope.surveys = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteSurvey = function(survey) {
		$http.delete("http://localhost:3000/api/surveys/" + survey._id)
			.success(function(response) {
				var index = $scope.surveys.indexOf(survey)
				$scope.surveys.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("SurveyCreateController", function($scope, $http, $location) {
	$scope.survey  = {};

	// Load data
	// $http.get("http://localhost:3000/api/questionTypes").success(function(response) {
	// 	$scope.questionTypes = response;
	// }).error(function(err) {
	// 	$scope.error = err;
	// });

	// Save data
	$scope.createSurvey = function() {
		$http.post("http://localhost:3000/api/surveys", $scope.survey)
			.success(function(response) {
				$location.url("/surveys");
			});
	}
});



/** EDIT **/

app.controller("SurveyEditController", function($scope, $http, $location, $routeParams) {
	$scope.survey  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/surveys/" + id).success(function(response) {
		$scope.survey = response;
	});

	// $http.get("http://localhost:3000/api/questionTypes").success(function(response) {
	// 	$scope.questionTypes = response;
	// }).error(function(err) {
	// 	$scope.error = err;
	// });

	// Save data
	$scope.saveSurvey = function() {
		$http.put("http://localhost:3000/api/surveys/" + $scope.survey._id, $scope.survey)
			.success(function(response) {
				$location.url("/surveys");
			});
	};
});