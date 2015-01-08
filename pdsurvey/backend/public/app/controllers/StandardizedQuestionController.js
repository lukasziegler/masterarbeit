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
	$scope.questionnaire  = {"name":"", "category":"", "description":"", 
		"sections":{"name":"", "questions":[{"question":"", "type":""}]}};
	$scope.categories  = {};

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
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

	// Functions
	$scope.addQuestion = function() {
		$scope.questionnaire.sections.questions.push({"name":"","type":""});
	};

});



/** EDIT **/

app.controller("StandardizedQuestionEditController", function($scope, $http, $location, $routeParams) {
	$scope.questionnaire  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/standardSurvey/" + id).success(function(response) {
		$scope.questionnaire = response;

		// Replace Object with ID for Preselect to work
		if (typeof $scope.questionnaire.category != 'undefined')
			$scope.questionnaire.category = $scope.questionnaire.category._id;

		for (var i = 0; i < $scope.questionnaire.sections.questions.length; i++) {
			if (typeof $scope.questionnaire.sections.questions[i].type != 'undefined')
				$scope.questionnaire.sections.questions[i].type = $scope.questionnaire.sections.questions[i].type._id;
		}
	});

	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
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

	// Functions
	$scope.addQuestion = function() {
		$scope.questionnaire.sections.questions.push({"name":"","type":""});
	};

	$scope.removeQuestion = function(item) {
		removeItem(item);
	};
});
