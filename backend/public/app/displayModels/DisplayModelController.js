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

app.controller("DisplayModelListController", function($scope, DisplayModel) {
	
	// Load all entries
	DisplayModel.query(function(data) {
		$scope.displayModels = data;
	}, function(err) {
		$scope.error = err;
	});

	// Delete selected entry
	$scope.deleteDisplayModel = function(displayModel) {
		DisplayModel.delete({id: displayModel._id}, {}, function() {
			var index = $scope.displayModels.indexOf(displayModel)
			$scope.displayModels.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

});



/** CREATE **/

app.controller("DisplayModelCreateController", function($scope, $location, DisplayModel, Context) {
	$scope.displayModel  = {};

	// Save data
	$scope.createDisplayModel = function() {
		Campaign.save($scope.displayModel, function() {
			$location.url("/displayModels");
		}, function(err) {
			$scope.error = err;
		});
	}

	// Load Context (for Autocomplete)
	$scope.staticContexts = [];
	$scope.contextStatic = [];

	Context.getStatic(function(data) {
		$scope.staticContexts = data;
	}, function(err) {
		$scope.error = err;
	});
});



/** EDIT **/

app.controller("DisplayModelEditController", function($scope, $location, $routeParams, DisplayModel, Context) {
	$scope.displayModel  = {};
	var id = $routeParams.id;

	// Load data
	DisplayModel.get( {id: id}, function(data) {
		$scope.displayModel = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	$scope.staticContexts = [];
	$scope.contextStatic = [];

	Context.getStatic(function(data) {
		$scope.staticContexts = data;
	}, function(err) {
		$scope.error = err;
	});


	// Save data
	$scope.saveDisplayModel = function() {
		$scope.displayModel.$update(function() {
			$location.url("/displayModels");
		}, function(err) {
			$scope.error = err;
		});
	};
});