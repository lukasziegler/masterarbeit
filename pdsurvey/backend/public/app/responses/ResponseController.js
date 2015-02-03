var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ResponseListController", function($scope, $http, config) {
	
	$http.get(config.API + "responses").success(function(response) {
		$scope.responses = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteResponse = function(response) {
		$http.delete(config.API + "responses/" + response._id)
			.success(function(response) {
				var index = $scope.responses.indexOf(response)
				$scope.responses.splice(index, 1);     
			});
	};

});
