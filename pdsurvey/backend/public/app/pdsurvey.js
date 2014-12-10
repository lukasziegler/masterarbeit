var app = angular.module("pdsurvey", ["ngRoute"]);

// app.config(function($routeProvider) {
// 	$routeProvider
// 		.when("/fahrten", {
// 			templateUrl: "/app/templates/fahrten/list.html",
// 			controller: "FahrtenListController"
// 		})
// 		.otherwise({redirectTo: "/fahrten"})
// });

app.controller("HomeController", function($scope, $http) {
	$scope.message = "Hallo Angular";

	$http.get("http://localhost:3000/api/questions").success(function(response) {
		$scope.questions = response;
	}).error(function(err) {
		$scope.error = err;
	});
});


app.controller("UserController", function($scope, $http) {
	$http.get("http://localhost:3000/api/users").success(function(response) {
		$scope.users = response;
	}).error(function(err) {
		$scope.error = err;
	});
});