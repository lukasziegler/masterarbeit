var app = angular.module("pdsurvey", ["ngRoute"]);

// Routing
app.config(function($routeProvider) {
	$routeProvider

		/* MAIN */
		.when("/survey", {
			templateUrl: "/app/templates/survey/index.html",
			controller: "SurveyController"
		})
		.when("/about", {
			templateUrl: "/app/templates/about/index.html",
			controller: "AboutController"
		})
		.when("/welcome", {
			templateUrl: "/app/templates/main/index.html",
			controller: "MainController"
		})

		.otherwise({redirectTo: "/notImplemented"})

});
