var app = angular.module("pdsurvey");


/** LIST **/

app.controller("DisplayListController", function($scope, $http) {
	
	// $http.get("http://localhost:3000/api/categories").success(function(response) {
	// 	$scope.categories = response;
	// }).error(function(err) {
	// 	$scope.error = err;
	// });

	// $scope.deleteCategory = function(category) {
	// 	$http.delete("http://localhost:3000/api/categories/" + category._id)
	// 		.success(function(response) {
	// 			var index = $scope.categories.indexOf(category)
	// 			$scope.categories.splice(index, 1);     
	// 		});
	// };

});