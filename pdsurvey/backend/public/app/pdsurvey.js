var app = angular.module("pdsurvey", ["ngRoute"]);

// Routing
app.config(function($routeProvider) {
	$routeProvider
		.when("/users", {
			templateUrl: "/app/templates/users/list.html",
			controller: "UserListController"
		})
		.when("/questions", {
			templateUrl: "/app/templates/questions/list.html",
			controller: "QuestionListController"
		})
		.when("/questions/new", {
			templateUrl: "/app/templates/questions/create.html",
			controller: "QuestionCreateController"
		})
		.when("/", {
			templateUrl: "/app/templates/dashboard/index.html",
			controller: "HomeController"
		})
		.otherwise({redirectTo: "/"})
});



app.controller("HomeController", function($scope, $http) {
	$scope.message = "Hallo Angular";
});