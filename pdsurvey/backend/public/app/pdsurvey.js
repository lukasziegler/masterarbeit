var app = angular.module("pdsurvey", ["ngRoute"]);

// Routing
app.config(function($routeProvider) {
	$routeProvider

		/* USERS */
		.when("/users", {
			templateUrl: "/app/templates/users/list.html",
			controller: "UserListController"
		})

		/* QUESTIONS */
		.when("/questions", {
			templateUrl: "/app/templates/questions/list.html",
			controller: "QuestionListController"
		})
		.when("/questions/new", {
			templateUrl: "/app/templates/questions/create.html",
			controller: "QuestionCreateController"
		})
		.when("/questions/:id/edit", {
			templateUrl: "/app/templates/questions/edit.html",
			controller: "QuestionEditController"
		})

		/* DASHBOARD */
		.when("/", {
			templateUrl: "/app/templates/dashboard/overview.html",
			controller: "HomeController"
		})
		.otherwise({redirectTo: "/"})
});



app.controller("HomeController", function($scope, $http) {
	$scope.message = "Hallo Angular";
});