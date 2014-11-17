/**
* app Module
*
* Mein erstes Test-Modul
*/
var app = angular.module('app', [])
	.value('headline', "Überschrift")

	.run( function( $log, headline ){
		$log.log("app started");

		document.getElementById("headline").innerHTML = headline;
	})
;