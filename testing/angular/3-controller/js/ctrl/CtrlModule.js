function Controller( $log, Model ) {
	
	$log.log("Controller fuer die View wurde erstellt");
	$log.log( Model.getValue() );

}

var p = Controller.prototype;

p.onClick = function() {

}

/**
* app.ctrl Module
*
* Description
*/
angular.module('app.ctrl', [])
	.controller('Controller', Controller )
	;
