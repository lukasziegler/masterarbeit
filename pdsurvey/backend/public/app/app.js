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

		/* QUESTION TYPES */
		.when("/questionTypes", {
			templateUrl: "/app/templates/questionTypes/list.html",
			controller: "QuestionTypeListController"
		})
		.when("/questionTypes/new", {
			templateUrl: "/app/templates/questionTypes/create.html",
			controller: "QuestionTypeCreateController"
		})
		.when("/questionTypes/:id/edit", {
			templateUrl: "/app/templates/questionTypes/edit.html",
			controller: "QuestionTypeEditController"
		})

		/* DASHBOARD */
		.when("/", {
			templateUrl: "/app/templates/dashboard/overview.html",
			controller: "DashboardController"
		})
		.otherwise({redirectTo: "/"})
});



app.controller("DashboardController", function($scope, $http) {
	$scope.message = "Welcome to PDSurvey";
});