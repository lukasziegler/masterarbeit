var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CategoryListController", function($scope, $http, config) {
	
	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteCategory = function(category) {
		$http.delete(config.API + "categories/" + category._id)
			.success(function(response) {
				var index = $scope.categories.indexOf(category)
				$scope.categories.splice(index, 1);     
			});
	};

	// Generate a random color for the Category tiles
	var randomColors = ["primary", "yellow", "green", "red"];
	$scope.randomColor = function() {
		var i = Math.floor( Math.random() * randomColors.length );
		return "panel-"+randomColors[i];
	};

});



/** CREATE **/

app.controller("CategoryCreateController", function($scope, $http, $location, config) {
	$scope.category  = {};

	// Save data
	$scope.createCategory = function() {
		$http.post(config.API + "categories", $scope.category)
			.success(function(response) {
				$location.url("/categories");
			});
	}
});



/** EDIT **/

app.controller("CategoryEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.category  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "categories/" + id).success(function(response) {
		$scope.category = response;
	});

	// Save data
	$scope.saveCategory = function() {
		$http.put(config.API + "categories/" + $scope.category._id, $scope.category)
			.success(function(response) {
				$location.url("/categories");
			});
	};
});



/** VIEW all linked Questionnaires **/

app.controller("CategoryViewController", function($scope, $http, $location, $routeParams, config) {
	$scope.category  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "categories/" + id).success(function(response) {
		$scope.category = response;
	});

});