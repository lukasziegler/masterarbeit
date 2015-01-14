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
.controller("AboutController", function($scope, $http, $location) {	
	$scope.message = "Angular.js test -";
})