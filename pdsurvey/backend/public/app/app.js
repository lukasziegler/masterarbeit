var app = angular.module("pdsurvey", ["ngRoute", "mgcrea.ngStrap"]);

// Routing
app.config(function($routeProvider) {
	$routeProvider

		/* USERS */
		.when("/users", {
			templateUrl: "/app/templates/users/list.html",
			controller: "UserListController"
		})
		.when("/users/new", {
			templateUrl: "/app/templates/users/create.html",
			controller: "UserCreateController"
		})
		.when("/users/:id/edit", {
			templateUrl: "/app/templates/users/edit.html",
			controller: "UserEditController"
		})

		/* RESPONSES */
		.when("/responses", {
			templateUrl: "/app/templates/responses/list.html",
			controller: "ResponseListController"
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
		.when("/categories/:id/", {
			templateUrl: "/app/templates/categories/view.html",
			controller: "CategoryViewController"
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

		/* STANDARDIZED QUESTIONNAIRE / SURVEY */
		.when("/standardizedQuestions", {
			templateUrl: "/app/templates/standardizedQuestions/list.html",
			controller: "StandardizedQuestionListController"
		})
		.when("/standardizedQuestions/new", {
			templateUrl: "/app/templates/standardizedQuestions/create.html",
			controller: "StandardizedQuestionCreateController"
		})
		.when("/standardizedQuestions/:id/edit", {
			templateUrl: "/app/templates/standardizedQuestions/edit.html",
			controller: "StandardizedQuestionEditController"
		})

		/* CAMPAIGNS */
		.when("/campaigns", {
			templateUrl: "/app/templates/campaigns/list.html",
			controller: "CampaignListController"
		})
		.when("/campaigns/new", {
			templateUrl: "/app/templates/campaigns/create.html",
			controller: "CampaignCreateController"
		})
		.when("/campaigns/:id/edit", {
			templateUrl: "/app/templates/campaigns/edit.html",
			controller: "CampaignEditController"
		})

		/* DISPLAYS */
		.when("/displays", {
			templateUrl: "/app/templates/displays/list.html",
			controller: "DisplayListController"
		})
		.when("/displays/new", {
			templateUrl: "/app/templates/displays/create.html",
			controller: "DisplayCreateController"
		})
		.when("/displays/:id/edit", {
			templateUrl: "/app/templates/displays/edit.html",
			controller: "DisplayEditController"
		})

		/* CONTEXTS */
		.when("/contexts", {
			templateUrl: "/app/templates/contexts/list.html",
			controller: "ContextListController"
		})
		.when("/contexts/new", {
			templateUrl: "/app/templates/contexts/create.html",
			controller: "ContextCreateController"
		})
		.when("/contexts/:id/edit", {
			templateUrl: "/app/templates/contexts/edit.html",
			controller: "ContextEditController"
		})

		/* DASHBOARD */
		.when("/", {
			templateUrl: "/app/templates/dashboard/overview.html",
			controller: "DashboardController"
		})

		.otherwise({redirectTo: "/"})

});
