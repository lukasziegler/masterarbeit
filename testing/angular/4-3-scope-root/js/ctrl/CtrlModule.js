function Controller( $scope, $log, Model ) {
	
	$log.log("Controller fuer die View wurde erstellt");
	$log.log( Model.getValue() );

	$scope.sayHello = "hello world!";
	$scope.sayHTML = "<strong>hello world</strong>";
	$scope.label = "klick mich";

	$log.log( $scope );

	$scope.click = function() {
		// $log.log("clicked");
		Model.incrementValue();
		$scope.sayHello = "Button wurde geklickt: # " + Model.getValue();
	}

	$scope.getHelloExpression = function() {
		return $scope.sayHello + " # " + Model.getValue();
	}

	this.scope = $scope;
}

var p = Controller.prototype;


function ButtonController( $scope, $log, Model ) {
	$log.log("new ButtonController");
	$scope.label = "klick mich ...";

	// Auf das Kind-Element zugreifen.
	this.scope = $scope;
	var that = this;
	$scope.click = function () {
		that.onClick();
	}
}


var p = ButtonController.prototype;

p.onClick = function() {
	// normaler Funktionsaufruf im Kind-Element
	console.log("ButtonController.click() "+this.scope.$root.version);
	
	// Zugriff auf das Eltern-Element
	// this.scope.$parent.click();
}

/**
* app.ctrl Module
*
* Description
*/
angular.module('app.ctrl', [])
	.controller('Controller', Controller )
	.controller('ButtonController', ButtonController )
	;
