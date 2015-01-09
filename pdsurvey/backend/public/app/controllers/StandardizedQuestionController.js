var app = angular.module("pdsurvey")


/** DIRECTIVES **/
// TODO: refactor code structure >> see 
.directive('helloWorld', function() {
  return {
      restrict: 'AEC',
      replace: true,
      template: '<h3>Hello, World!</h3>'
}; });

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
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
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
	$scope.addQuestion = function(section) {
		var index = $scope.questionnaire.sections.indexOf(section)

		// Nice to have: prefill the next question with the last question type
		var numQuestions = $scope.questionnaire.sections[index].questions.length;
		if (numQuestions < 2)
			$scope.questionnaire.sections[index].questions.push({"name":"","type":""});
		else {
			var lastQuestionType = $scope.questionnaire.sections[index].questions[numQuestions-1].type;
			$scope.questionnaire.sections[index].questions.push({"name":"","type":lastQuestionType});
		}
	};

	$scope.removeQuestion = function(section, question) {
		var indexSection = $scope.questionnaire.sections.indexOf(section);
		var indexQuestion = $scope.questionnaire.sections[indexSection].questions.indexOf(question);
		$scope.questionnaire.sections[indexSection].questions.splice(indexQuestion, 1);     

		if ($scope.questionnaire.sections[indexSection].questions.length < 1)
			$scope.deleteSection(section);
	};

	$scope.addSection = function() {
		$scope.questionnaire.sections.push({"name":"","questions":[{"question":"","type":""}]});
	};

	$scope.deleteSection = function(section) {
		var indexSection = $scope.questionnaire.sections.indexOf(section);
		$scope.questionnaire.sections.splice(indexSection, 1);     
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
	$scope.addQuestion = function(section) {
		var index = $scope.questionnaire.sections.indexOf(section)

		// Nice to have: prefill the next question with the last question type
		var numQuestions = $scope.questionnaire.sections[index].questions.length;
		if (numQuestions < 2)
			$scope.questionnaire.sections[index].questions.push({"name":"","type":""});
		else {
			var lastQuestionType = $scope.questionnaire.sections[index].questions[numQuestions-1].type;
			$scope.questionnaire.sections[index].questions.push({"name":"","type":lastQuestionType});
		}
	};

	$scope.removeQuestion = function(section, question) {
		var indexSection = $scope.questionnaire.sections.indexOf(section);
		var indexQuestion = $scope.questionnaire.sections[indexSection].questions.indexOf(question);
		$scope.questionnaire.sections[indexSection].questions.splice(indexQuestion, 1);     

		if ($scope.questionnaire.sections[indexSection].questions.length < 1)
			$scope.deleteSection(section);
	};

	$scope.addSection = function() {
		$scope.questionnaire.sections.push({"name":"","questions":[{"question":"","type":""}]});
	};

	$scope.deleteSection = function(section) {
		var indexSection = $scope.questionnaire.sections.indexOf(section);
		$scope.questionnaire.sections.splice(indexSection, 1);     
	};
});
