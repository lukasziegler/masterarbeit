function ContainerCtrl ( $scope, $log ) {
	this.scope = $scope;
	$log.log ("ContainerCtrl initialized");
}

function LeftCtrl ( $scope, $log, $element ) {
	this.scope = $scope;
	$log.log ("LeftCtrl initialized");

	$scope.$on ( "$destroy", function() {
		$log.log("Ich habe die Destroy-Nachricht erhalten");
	} );

	$scope.remove = function() {
		$scope.$destroy();
		$element.remove();
	}

}

function RightCtrl ( $scope, $log ) {
	this.scope = $scope;
	$log.log ("RightCtrl initialized");
}


angular.module('app.ctrl', [])
	.controller('ContainerCtrl', ContainerCtrl)
	.controller('LeftCtrl', LeftCtrl)
	.controller('RightCtrl', RightCtrl)
	;