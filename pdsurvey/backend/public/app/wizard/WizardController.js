var app = angular.module("pdsurvey")


/** DIRECTIVES **/

.directive('pdAddDisplay', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default" type="button" ng-click="addDisplay(display)" title="Add Display"><i class="fa fa-plus"></i></button>',
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


/** CONTROLLERS **/

app.controller("WizardController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/users").success(function(response) {
		$scope.users = response;
	}).error(function(err) {
		$scope.error = err;
	});

})