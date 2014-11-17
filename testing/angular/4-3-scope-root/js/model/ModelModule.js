var Model = function( $log , number, myConst) {
	$log.log ("new Instance of Model");

	return {
		getSampleData : function () {
			return "Hello World";
		},
		getValue : function () {
			return number;
		}, 
		setValue : function (val) {
			number = val;
		},
		incrementValue : function () {
			number = number + 1;
		},
		getConst : function () {
			return myConst;
		}
	}
}

/**
*  Module
*
* Description
*/
var model = angular.module('app.model', [])
	.value('number', 0)
	.constant('myConst', " rocks!")
	.factory('Model', Model);