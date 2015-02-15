var app = angular.module("pdsurvey")


/** DIRECTIVES **/
.directive('pdAddQuestion', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="addQuestion(section)" class="btn btn-default">Add Question</a>',
		link: function(scope, elem, attrs) {

			scope.addQuestion = function(section) {
				var index = scope.survey.sections.indexOf(section)

				// Nice to have: prefill the next question with the last question type
				var numQuestions = scope.survey.sections[index].questions.length;
				if (numQuestions < 2)
					scope.survey.sections[index].questions.push({"name":"","type":""});
				else {
					var lastQuestionType = scope.survey.sections[index].questions[numQuestions-1].type;
					scope.survey.sections[index].questions.push({"name":"","type":lastQuestionType});
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
				var indexSection = scope.survey.sections.indexOf(section);
				scope.survey.sections.splice(indexSection, 1);     
			};

			scope.deleteQuestion = function(section, question) {
				var indexSection = scope.survey.sections.indexOf(section);
				var indexQuestion = scope.survey.sections[indexSection].questions.indexOf(question);
				scope.survey.sections[indexSection].questions.splice(indexQuestion, 1);     

				if (scope.survey.sections[indexSection].questions.length < 1)
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
				scope.survey.sections.push({"name":"","questions":[{"question":"","type":""}]});
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
				var indexSection = scope.survey.sections.indexOf(section);
				var indexQuestion = scope.survey.sections[indexSection].questions.indexOf(question);
				scope.survey.sections[indexSection].questions.splice(indexQuestion, 1);     

				if (scope.survey.sections[indexSection].questions.length < 1)
					scope.deleteSection(section);
			}
		}
	};
})
