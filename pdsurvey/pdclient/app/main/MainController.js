var app = angular.module("pdclient")



//================================================
// Main Controller
//================================================

.controller("MainController", function($scope) {	

})



//================================================
// About Controller
//================================================

.controller("AboutController", function($scope, $http, $rootScope, $location) {	
	$scope.message = "Angular.js test -";

	// load Questionnaires
	$http.get($rootScope.restApi + "/surveys").success(function(response) {
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


//================================================
// Contact Controller
//================================================

.controller("ContactController", function($scope) {	
	$scope.message = "foo";
})



