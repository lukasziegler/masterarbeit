function Controller( $scope, $log, Model ) {
	
	$log.log("Controller fuer die View wurde erstellt");
	$log.log( Model.getValue() );

	$scope.sayHello = "hello world!";
	$scope.sayHTML = "<strong>hello world</strong>";

	$log.log( $scope );

	var that = this;
	$scope.click = function() {
		that.onClick();
	}

	$scope.click = function() {
		// $log.log("clicked");
		Model.incrementValue();
		$scope.sayHello = "Button wurde geklickt: # " + Model.getValue();
	}

	$scope.getHelloExpression = function() {
		return $scope.sayHello + " # " + Model.getValue();
	}
}

var p = Controller.prototype;

p.onClick = function() {
	this.model.setValue( this.model.getValue );
}

/**
* app.ctrl Module
*
* Description
*/
angular.module('app.ctrl', [])
	.controller('Controller', Controller )
	;
