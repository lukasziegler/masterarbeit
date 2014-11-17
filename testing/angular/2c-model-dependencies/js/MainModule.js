/**
* app Module
*
* Mein erstes Test-Modul
*/
var app = angular.module('app', ['app.model'])
	
	.run( function( $log, Model ){
		$log.log("app started");

		document.getElementById("headline").innerHTML = Model.getValue() + Model.getConst();
		document.getElementById("foo").innerHTML = Model.getSampleData();
	})

;