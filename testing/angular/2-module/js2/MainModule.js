/**
* app Module
*
* Mein erstes Test-Modul
*/
var app = angular.module('app', ['app.model'])
	
	.run( function( $log, headline, myConst, Model ){
		$log.log("app started");

		// document.getElementById("headline").innerHTML = headline + myConst;
		document.getElementById("headline").innerHTML = Model.getSampleData();
	})

;