var app = angular.module("pdclient", ["ngRoute"])

//================================================
// Defining RootScope
//================================================
.run(function($rootScope, $location) {

	// parameters
	$rootScope.restApi = "http://localhost:3000/api";
	$rootScope.displayId = "54ec391b27699f6d1056d49f";

	// specify .active class for top navigation
	$rootScope.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	      return "active"
	    } else {
	      return ""
	    }
	}

})


//================================================
// ROUTING + Config
//================================================

.config(function($routeProvider, $locationProvider) {
	$routeProvider

		/* MAIN */
		.when("/survey", {
			templateUrl: "/app/survey/index.html",
			controller: "SurveyRandomController"
		})
		.when("/campaign/:id", {
			templateUrl: "/app/survey/index.html",
			controller: "SurveyCampaignController"
		})
		.when("/about", {
			templateUrl: "/app/main/templates/about.html",
			controller: "AboutController"
		})
		.when("/contact", {
			templateUrl: "/app/main/templates/contact.html",
			controller: "ContactController"
		})

		.otherwise({redirectTo: "/survey"});

	// enable HTML5 Mode
	$locationProvider.html5Mode(true);
})
