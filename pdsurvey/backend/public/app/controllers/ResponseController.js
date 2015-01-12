var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ResponseListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/responses").success(function(response) {
		$scope.responses = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteResponse = function(response) {
		$http.delete("http://localhost:3000/api/responses/" + response._id)
			.success(function(response) {
				var index = $scope.responses.indexOf(response)
				$scope.responses.splice(index, 1);     
			});
	};

});
