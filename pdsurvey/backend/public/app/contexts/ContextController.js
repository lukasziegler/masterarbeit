var app = angular.module("pdsurvey");


/** LIST **/

app.controller("ContextListController", function($scope, Context) {
	
	// Load all data
	Context.query(function(data) {
		$scope.contexts = data;
	}, function(err) {
		$scope.error = err;
	});

	// Delete single entry
	$scope.deleteContext = function(context) {
		Context.delete({id: context._id}, {}, function() {
			var index = $scope.contexts.indexOf(context)
			$scope.contexts.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};
});



/** CREATE **/

app.controller("ContextCreateController", function($scope, $location, Context) {
	$scope.context  = {};

	// Save data
	$scope.createContext = function() {
		Context.save($scope.context, function() {
			$location.url("/contexts");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("ContextEditController", function($scope, $location, $routeParams, Context) {
	$scope.context  = {};
	var id = $routeParams.id;

	// Load data
	Context.get( {id: id}, function(data) {
		$scope.context = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveContext = function() {
		$scope.context.$update(function() {
			$location.url("/contexts");
		}, function(err) {
			$scope.error = err;
		});
	};
});
