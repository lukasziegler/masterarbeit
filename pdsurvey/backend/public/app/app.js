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

		/* CATEGORIES */
		.when("/categories", {
			templateUrl: "/app/templates/categories/list.html",
			controller: "CategoryListController"
		})
		.when("/categories/new", {
			templateUrl: "/app/templates/categories/create.html",
			controller: "CategoryCreateController"
		})
		.when("/categories/:id/edit", {
			templateUrl: "/app/templates/categories/edit.html",
			controller: "CategoryEditController"
		})

		/* SURVEYS */
		.when("/surveys", {
			templateUrl: "/app/templates/surveys/list.html",
			controller: "SurveyListController"
		})
		.when("/surveys/new", {
			templateUrl: "/app/templates/surveys/create.html",
			controller: "SurveyCreateController"
		})
		.when("/surveys/:id/edit", {
			templateUrl: "/app/templates/surveys/edit.html",
			controller: "SurveyEditController"
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