var app = angular.module("pdsurvey")


/** DIRECTIVES **/
.directive('pdAddQuestion', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="addQuestion(section)" class="btn btn-default">Add Question</a>',
		link: function(scope, elem, attrs) {

			scope.addQuestion = function(section) {
				var index = scope.questionnaire.sections.indexOf(section)

				// Nice to have: prefill the next question with the last question type
				var numQuestions = scope.questionnaire.sections[index].questions.length;
				if (numQuestions < 2)
					scope.questionnaire.sections[index].questions.push({"name":"","type":""});
				else {
					var lastQuestionType = scope.questionnaire.sections[index].questions[numQuestions-1].type;
					scope.questionnaire.sections[index].questions.push({"name":"","type":lastQuestionType});
				}
			}
       		// elem.bind("click", function(e) {
       		// 	console.log(elem);
       		// });
		}
	};
})

.directive('pdDeleteQuestion', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default" type="button" ng-click="deleteQuestion(section, question)" title="Remove Question"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {

			scope.deleteSection = function(section) {
				var indexSection = scope.questionnaire.sections.indexOf(section);
				scope.questionnaire.sections.splice(indexSection, 1);     
			};

			scope.deleteQuestion = function(section, question) {
				var indexSection = scope.questionnaire.sections.indexOf(section);
				var indexQuestion = scope.questionnaire.sections[indexSection].questions.indexOf(question);
				scope.questionnaire.sections[indexSection].questions.splice(indexQuestion, 1);     

				if (scope.questionnaire.sections[indexSection].questions.length < 1)
					scope.deleteSection(section);
			};

		}
	};
})

.directive('pdAddSection', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="addSection()" class="btn btn-default">Add Section</a>',
		link: function(scope, elem, attrs) {
			scope.addSection = function() {
				scope.questionnaire.sections.push({"name":"","questions":[{"question":"","type":""}]});
			}
		}
	};
})

.directive('pdDeleteSection', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default" type="button" ng-click="deleteQuestion(section, question)" title="Remove Question"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.deleteQuestion = function(section, question) {
				var indexSection = scope.questionnaire.sections.indexOf(section);
				var indexQuestion = scope.questionnaire.sections[indexSection].questions.indexOf(question);
				scope.questionnaire.sections[indexSection].questions.splice(indexQuestion, 1);     

				if (scope.questionnaire.sections[indexSection].questions.length < 1)
					scope.deleteSection(section);
			}
		}
	};
})



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
});
