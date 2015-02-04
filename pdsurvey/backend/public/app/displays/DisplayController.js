var app = angular.module("pdsurvey")



//================================================
// DIRECTIVES
//================================================


.directive('pdAddContext', function() {
	return {
		restrict: 'A',
		replace: false,
		// template: '<a href="" ng-click="addContext(display.contextDynamic)" class="btn btn-default"><i class="fa fa-plus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.addContext = function(newContext) {

			if (scope.dynamicContexts.indexOf(newContext) != -1) {
				// add to contextDynamic List
				// scope.contextDynamic.push( { _id: newContext._id, name: newContext.name, value: ""} );
				scope.contextDynamic.push( newContext );

				// remove form Dropbown dynamicContexts
				var index = scope.dynamicContexts.indexOf(newContext)
				scope.dynamicContexts.splice(index, 1);
			}
		}

		}
	};
})

.directive('pdRemoveContext', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="removeContext(context)" class="btn btn-default"><i class="fa fa-minus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.removeContext = function(context) {
			// add to dynamicContexts List
			scope.dynamicContexts.push( context );

			// remove form Dropbown contextDynamic
			var index = scope.contextDynamic.indexOf(context)
			scope.contextDynamic.splice(index, 1);
		}

		}
	};
})


//================================================
// CONTROLLERS
//================================================


/** LIST **/

.controller("DisplayListController", function($scope, $http, config) {
	
	$http.get(config.API + "displays").success(function(response) {
		$scope.displays = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteDisplay = function(display) {
		$http.delete(config.API + "displays/" + display._id)
			.success(function(response) {
				var index = $scope.displays.indexOf(display)
				$scope.displays.splice(index, 1);     
			});
	};

})



/** CREATE **/

.controller("DisplayCreateController", function($scope, $http, $location, config) {
	$scope.display  = {};

	// TEMPORARY
		$scope.display.user = "54a6b51a276762fc510bb0f0";
	// TEMPORARY

	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	// Load Display Models (for Autocomplete)
	$http.get(config.API + "displayModels/").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	$http.get(config.API + "contexts/dynamic/").success(function(response) {
		$scope.dynamicContexts = response;
	}).error(function(err) {
		$scope.error = err;
	});


	// Save data
	$scope.createDisplay = function() {
		$scope.display.contextDynamic = $scope.contextDynamic;

		$http.post(config.API + "displays", $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	}
})



/** EDIT **/

.controller("DisplayEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.display  = {};
	var id = $routeParams.id;

	// TEMPORARY
		$scope.display.user = "54a6b51a276762fc510bb0f0";
	// TEMPORARY

	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	// Load Display ID
	$http.get(config.API + "displays/" + id).success(function(response) {
		$scope.display = response;

		// copy values to temporary 
		$scope.contextDynamic = $scope.display.contextDynamic;
		$scope.display.contextDynamic = $scope.display.contextDynamic._id;

		// $scope.display.displayModel = $scope.display.displayModel._id;
		// console.log($scope.display.displayModel)
	});

	// Load Display Models (for Autocomplete)
	$http.get(config.API + "displayModels/").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	$http.get(config.API + "contexts/dynamic/").success(function(response) {
		$scope.dynamicContexts = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveDisplay = function() {
		$http.put(config.API + "displays/" + $scope.display._id, $scope.display)
			.success(function(response) {
				$location.url("/displays");
			});
	};
});