var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CategoryListController", function($scope, Category) {
	
	// Load all data
	Category.query(function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});

	// Delete single entry
	$scope.deleteCategory = function(category) {
		Category.delete({id: category._id}, {}, function() {
			var index = $scope.categories.indexOf(category)
			$scope.categories.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
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

app.controller("CategoryCreateController", function($scope, $location, Category) {
	$scope.category  = {};

	// Save data
	$scope.createCategory = function() {
		Category.save($scope.category, function() {
			$location.url("/categories");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("CategoryEditController", function($scope, $location, $routeParams, Category) {
	$scope.category  = {};
	var id = $routeParams.id;

	// Load data
	Category.get( {id: id}, function(data) {
		$scope.category = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveCategory = function() {
		$scope.category.$update(function() {
			$location.url("/categories");
		}, function(err) {
			$scope.error = err;
		});
	};
});



/** VIEW all linked Questionnaires **/

app.controller("CategoryViewController", function($scope, $location, $routeParams, Category) {
	$scope.category  = {};
	var id = $routeParams.id;

	// Load data
	Category.get( {id: id}, function(data) {
		$scope.categories = data;
	}, function(err) {
		$scope.error = err;
	});
});
