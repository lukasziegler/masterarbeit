var Model = function( $log ) {
	$log.log("new Instance of Model");

	return {
		getSampleData : function () {
			return "Hello World";
		}
	}
}

/**
* app.model Module
*
* Lektion: "Abhängigkeiten definieren"
*/
var model = angular.module('app.model', [])

	.value('headline', "angularJS")
	.constant('myConst', " rocks!!!")

	.factory('Model', Model)
	;