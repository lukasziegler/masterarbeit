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
