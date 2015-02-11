var app = angular.module("pdsurvey")


//================================================
// DIRECTIVES
//================================================

.directive('pdAddContextStatic', function() {
	return {
		restrict: 'A',
		replace: false,
		// template: '<a href="" ng-click="addContext(display.contextStatic)" class="btn btn-default"><i class="fa fa-plus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.addContext = function(newContext) {

			if (scope.staticContexts.indexOf(newContext) != -1) {
				scope.contextStatic.push( newContext );

				// remove form Dropbown staticContexts
				var index = scope.staticContexts.indexOf(newContext)
				scope.staticContexts.splice(index, 1);
			}
		}

		}
	};
})

.directive('pdRemoveContextStatic', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="removeContext(context)" class="btn btn-default"><i class="fa fa-minus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.removeContext = function(context) {
			// add to staticContexts List
			scope.staticContexts.push( context );

			// remove form Dropbown contextStatic
			var index = scope.contextStatic.indexOf(context)
			scope.contextStatic.splice(index, 1);
		}

		}
	};
})


//================================================
// CONTROLLERS
//================================================

/** LIST **/

app.controller("DisplayModelListController", function($scope, $http, config) {
	
	$http.get(config.API + "displayModels").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteDisplayModel = function(displayModel) {
		$http.delete(config.API + "displayModels/" + displayModel._id)
			.success(function(response) {
				var index = $scope.displayModels.indexOf(displayModel)
				$scope.displayModels.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("DisplayModelCreateController", function($scope, $http, $location, config) {
	$scope.displayModel  = {};

	// Save data
	$scope.createDisplayModel = function() {
		$http.post(config.API + "displayModels", $scope.displayModel)
			.success(function(response) {
				$location.url("/displayModels");
			});
	}

	// Load Context (for Autocomplete)
	$scope.staticContexts = [];
	$scope.contextStatic = [];

	$http.get(config.API + "contexts/static/").success(function(response) {
		$scope.staticContexts = response;
	}).error(function(err) {
		$scope.error = err;
	});
});



/** EDIT **/

app.controller("DisplayModelEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.displayModel  = {};
	var id = $routeParams.id;

	// Load data
	$http.get(config.API + "displayModels/" + id).success(function(response) {
		$scope.displayModel = response;
	});

	// Load Context (for Autocomplete)
	$scope.staticContexts = [];
	$scope.contextStatic = [];

	$http.get(config.API + "contexts/static/").success(function(response) {
		$scope.staticContexts = response;
	}).error(function(err) {
		$scope.error = err;
	});


	// Save data
	$scope.saveDisplayModel = function() {
		$http.put(config.API + "displayModels/" + $scope.displayModel._id, $scope.displayModel)
			.success(function(response) {
				$location.url("/displayModels");
			});
	};
});