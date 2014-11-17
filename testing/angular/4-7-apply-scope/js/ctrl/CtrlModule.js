function Controller ( $scope, $log ) {
	
	$scope.prop = "Wert im Scope";

	$scope.click = function() {
		$scope.prop = "Wert geändert";

		// dritter Versuch

		setTimeout( function() {
			
			$scope.$apply( function() {
				$scope.prop = "Wert wieder geändert";
			});

		}, 500);
	}

	// this.val = "World";
	// this.sayHello();

// erster Versuch, > undefined
	// setTimeout( this.sayHello, 500 );

// zweiter Versuch, funktioniert wieder
	// var that = this;
	// var fct = function() {
	// 	that.sayHello();
	// }
	// setTimeout( fct, 500 );

	// console.log("Ende des Controllers");



}

var p = Controller.prototype;

p.sayHello = function() {
	console.log("say Hello "+ this.val);
}

angular.module('app.ctrl', [])
	.controller('Controller', Controller)
	;