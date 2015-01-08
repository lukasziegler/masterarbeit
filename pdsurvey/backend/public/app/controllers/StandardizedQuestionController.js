var app = angular.module("pdsurvey");


/** LIST **/

app.controller("StandardizedQuestionListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/standardSurvey").success(function(response) {
		$scope.questionnaires = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(standardizedQuestion) {
		$http.delete("http://localhost:3000/api/standardSurvey/" + standardizedQuestion._id)
			.success(function(response) {
				var index = $scope.questionnaires.indexOf(standardizedQuestion)
				$scope.questionnaires.splice(index, 1);     
			});
	};

});
	


/** CREATE **/

app.controller("StandardizedQuestionCreateController", function($scope, $http, $location) {
	$scope.questionnaire  = {};
	$scope.categories  = {};

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createStandardQuestion = function() {
		$http.post("http://localhost:3000/api/standardSurvey", $scope.questionnaire)
			.success(function(response) {
				$location.url("/standardizedQuestions");
			});
	}
});



/** EDIT **/

app.controller("StandardizedQuestionEditController", function($scope, $http, $location, $routeParams) {
	$scope.questionnaire  = {};
	$scope.categories  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/standardSurvey/" + id).success(function(response) {
		$scope.questionnaire = response;

		if (typeof $scope.questionnaire.category != 'undefined')
			$scope.questionnaire.category = $scope.questionnaire.category._id;
	});

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;

		// Preselect the right Category
	//	http://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-object
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveStandardQuestion = function() {
		$http.put("http://localhost:3000/api/standardSurvey/" + $scope.questionnaire._id, $scope.questionnaire)
			.success(function(response) {
				$location.url("/standardizedQuestions");
			});
	};
});