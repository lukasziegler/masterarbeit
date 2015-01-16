var app = angular.module("pdsurvey")

/* Defining root scope */
.run(function($rootScope, $location) {

	// parameters
	$rootScope.restApi = "http://localhost:3000/api";

	// specify .active class for top navigation
	$rootScope.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	      return "active"
	    } else {
	      return ""
	    }
	}

})

/* Main Controller */
.controller("MainController", function($scope, $http) {	
	$scope.message = "Angular.js test -";
})

/* /about */
.controller("AboutController", function($scope, $http, $rootScope, $location) {	
	$scope.message = "Angular.js test -";

	// load Questionnaires
	$http.get($rootScope.restApi + "/standardSurvey").success(function(response) {
		$scope.questionnaires = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Debug: functions
	$scope.numQuestions = function(sections) {
		var num = 0;
		for (var i = 0; i < sections.length; i++) {
			num += sections[i].questions.length;
		};
		return num;
	};
})