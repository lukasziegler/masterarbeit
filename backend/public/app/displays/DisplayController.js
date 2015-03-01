var app = angular.module('pdsurvey')

// Template for Modals 
.run(function($templateCache) {
	$templateCache.put('modal/wizard/addDisplayModel.html', '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind-html="title"></h4></div><div class="modal-body" ng-show="content" ng-include="\'/app/displayModels/templates/_form.html\'"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button> <button type="button" class="btn btn-primary" ng-click="$hide()">Save changes</button></div></div></div></div>');
})


//================================================
// DIRECTIVES
//================================================


.directive('pdAddContextDynamic', function() {
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

.directive('pdRemoveContextDynamic', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<a href="" ng-click="removeContext(context)" class="btn btn-default"><i class="fa fa-minus"></i></a>',
		link: function(scope, elem, attrs) {

		scope.removeContext = function(context) {
			// add to dynamicContexts List
			scope.dynamicContexts.push( context );

			// remove from Dropbown contextDynamic
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

.controller("DisplayListController", function($scope, Display) {

	getDisplays();

	function getDisplays() {
		Display.query(function(data) {
			$scope.displays = data;
		}, function(err) {
			$scope.error = err;
		});
	}

	$scope.deleteDisplay = function(display) {
		Display.delete({id: display._id}, {}, function() {
			var index = $scope.displays.indexOf(display)
			$scope.displays.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	}
})



/** CREATE **/

.controller("DisplayCreateController", function($scope, $rootScope, $location, $modal,
	Display, DisplayModel, Context) {

	$scope.display  = {};
	$scope.display.user = $rootScope.userId;

	$scope.modal = {
	  "title": "Add Display Model",
	  "content": 'Hello Modal<br />This is a multiline message!'
	};

	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	getDisplayModels();

	// Load Display Models (for Autocomplete)
	function getDisplayModels () {
		DisplayModel.query(function(data) {
			$scope.displayModels = data;
		}, function(err) {
			$scope.error = err;
		});
	}

	// Load Context (for Autocomplete)
	Context.getDynamic(function(data) {
		$scope.dynamicContexts = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.createDisplay = function() {
		$scope.display.contextDynamic = $scope.contextDynamic;

		Display.save($scope.display, function() {
			$location.url("/displays");
		}, function(err) {
			$scope.error = err;
		});
	}
})



/** EDIT **/

.controller("DisplayEditController", function($scope, $rootScope, $location, $routeParams, $modal,
	Display, DisplayModel, Context) {

	$scope.display  = {};
	$scope.display.user = $rootScope.userId;
	var id = $routeParams.id;

	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	// Load Display
	Display.get( {id: id}, function(data) {
		$scope.display = data;

		// copy values to temporary 
		$scope.contextDynamic = $scope.display.contextDynamic;
		$scope.display.contextDynamic = $scope.display.contextDynamic._id;

	}, function(err) {
		$scope.error = err;
	});

	// Load Display Models (for Autocomplete)
	DisplayModel.query(function(data) {
		$scope.displayModels = data;
	}, function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	Context.getDynamic(function(data) {
		$scope.dynamicContexts = data;
	}, function(err) {
		$scope.error = err;
	});

	// Save data
	$scope.saveDisplay = function() {
		$scope.display.$update(function() {
			$location.url("/displays");
		}, function(err) {
			$scope.error = err;
		});
	};
});