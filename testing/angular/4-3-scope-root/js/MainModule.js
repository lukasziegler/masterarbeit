/**
* app Module
*
* Main Module
*/
var app = angular.module('app', ['app.model', 'app.ctrl'])
	
	.run( function( $rootScope, $log, Model ) {

		Model.setValue( Math.floor( Math.random() * 100 ));

		$rootScope.version = "v1.0.0";

		$rootScope.setUp = function() {
			Model.incrementValue();
		}
	})
;