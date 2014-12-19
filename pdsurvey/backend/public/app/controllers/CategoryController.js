var app = angular.module("pdsurvey");


/** LIST **/

app.controller("CategoryListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteCategory = function(category) {
		$http.delete("http://localhost:3000/api/categories/" + category._id)
			.success(function(response) {
				var index = $scope.categories.indexOf(category)
				$scope.categories.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("CategoryCreateController", function($scope, $http, $location) {
	$scope.category  = {};

	// Save data
	$scope.createCategory = function() {
		$http.post("http://localhost:3000/api/categories", $scope.category)
			.success(function(response) {
				$location.url("/categories");
			});
	}
});



/** EDIT **/

app.controller("CategoryEditController", function($scope, $http, $location, $routeParams) {
	$scope.category  = {};
	var id = $routeParams.id;

	// Load data
	$http.get("http://localhost:3000/api/categories/" + id).success(function(response) {
		$scope.category = response;
	});

	// Save data
	$scope.saveCategory = function() {
		$http.put("http://localhost:3000/api/categories/" + $scope.category._id, $scope.category)
			.success(function(response) {
				$location.url("/categories");
			});
	};
});