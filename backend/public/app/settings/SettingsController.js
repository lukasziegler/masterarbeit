var app = angular.module('pdsurvey')


//================================================
// CONTROLLERS
//================================================

.controller("SettingsController", function($scope, $rootScope, 
	$compile, $window, authService) {

	$scope.settings = {};
	$scope.userRoles = ['guest', 'admin'];

	//init
	$scope.settings.role = authService.getUserRole();

	$scope.setUserRole = function(role) {
		if (role === 'admin') {
			authService.setAdmin(true);
			$rootScope.userRole = 'admin';
		}
		else {
			authService.setAdmin(false);
			$rootScope.userRole = 'guest';
		}
	}

	$scope.cancel = function() {
		$window.history.back();
	}

	$scope.saveSettings = function() {

		// TEMP
		$window.history.back();
		// TEMP

	}
})