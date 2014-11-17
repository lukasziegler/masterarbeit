var Model = function( $log , headline, myConst) {
	$log.log ("new Instance of Model");

	return {
		getSampleData : function () {
			return "Hello World";
		},
		getValue : function () {
			return headline;
		}, 
		setValue : function (val) {
			headline = val;
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
	.value('headline', "angularJS is ...")
	.constant('myConst', " rocks!")
	.factory('Model', Model);