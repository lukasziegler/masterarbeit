/**
* app Module
*
* Main Module
*/
var app = angular.module('app', ['app.model', 'app.ctrl'])
	
	.run( function( $log, Model ) {
		document.getElementById( "preloader" ).innerHTML = Model.getSampleData();
		document.getElementById( "headline" ).innerHTML = "Angular.JS" + Model.getConst();
	})
;