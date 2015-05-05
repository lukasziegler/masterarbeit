var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ResponseListController", function($scope, Response) {
	
	// Load all entries
	Response.query(function(data) {
		$scope.responses = data;
	}, function(err) {
		$scope.error = err;
	});

	$scope.deleteResponse = function(response) {
		Response.delete({id: response._id}, {}, function() {
			var index = $scope.responses.indexOf(response)
			$scope.responses.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

});
