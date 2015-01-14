var app = angular.module("pdsurvey", ["ngRoute"]);

// Routing
app.config(function($routeProvider) {
	$routeProvider

		/* MAIN */
		.when("/survey", {
			templateUrl: "/app/survey/index.html",
			controller: "SurveyController"
		})
		.when("/about", {
			templateUrl: "/app/main/about.html",
			controller: "AboutController"
		})
		.when("/welcome", {
			templateUrl: "/app/main/index.html",
			controller: "MainController"
		})

		.otherwise({redirectTo: "/survey"})

});
