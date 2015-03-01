var app = angular.module("pdsurvey");


/** LIST **/

app.controller("UserListController", function($scope, User) {
	
	// Load all entries
	User.query(function(data) {
		$scope.users = data;
	}, function(err) {
		$scope.error = err;
	});

	$scope.deleteUser = function(user) {
		User.delete({id: user._id}, {}, function() {
			var index = $scope.users.indexOf(user)
			$scope.users.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};
});



/** CREATE **/

app.controller("UserCreateController", function($scope, $location, User) {
	$scope.user  = {};

	// Save data
	$scope.createUser = function() {
		User.save($scope.user, function() {
			$location.url("/users");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("UserEditController", function($scope, $location, $routeParams, User) {
	$scope.user  = {};
	var id = $routeParams.id;

	// Load data
	User.get( {id: id}, function(data) {
		$scope.user = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveUser = function() {
		$scope.user.$update(function() {
			$location.url("/users");
		}, function(err) {
			$scope.error = err;
		});
	};
});