function ParentCtrl ( $scope, $log ) {
	this.scope = $scope;
	$log.log ("ContainerCtrl initialized");

	$scope.test = 0;
	$scope.add = function () {
		$scope.test ++;
	}
}

function ChildCtrl ( $scope, $log, $element ) {
	this.scope = $scope;
	$log.log ("LeftCtrl initialized");

	$scope.$parent.$watch( "test", function( newVal, oldVal ) {
		$log.log ("old: "+oldVal+", new: "+newVal);
	} );
}


angular.module('app.ctrl', [])
	.controller('ParentCtrl', ParentCtrl)
	.controller('ChildCtrl', ChildCtrl)
	;