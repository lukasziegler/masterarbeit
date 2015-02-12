var app = angular.module('pdsurvey')


//================================================
//  REST-API
//================================================

	.factory('Question', function($resource) {
	    return $resource('/api/questions/:id');
	})

	.factory('Response', function($resource) {
	    return $resource('/api/responses/:id');
	})

	.factory('QuestionType', function($resource) {
	    return $resource('/api/questionTypes/:id');
	})

	.factory('Category', function($resource) {
	    return $resource('/api/categories/:id');
	})

	.factory('Survey', function($resource) {
	    return $resource('/api/surveys/:id');
	})

	.factory('StandardizedSurvey', function($resource) {
	    return $resource('/api/standardSurvey/:id');
	})

	.factory('DisplayModel', function($resource) {
	    return $resource('/api/displayModels/:id');
	})

	.factory('Display', function($resource) {
	    return $resource('/api/displays/:id');
	})

	.factory('Campaign', function($resource) {
	    return $resource('/api/campaigns/:id');
	})

	.factory('Context', function($resource) {
	    return $resource('/api/contexts/:id', {},
	    	{
	    		'getStatic': {'method': 'GET', 'params': {'type': 'dynamic'}, isArray: true},
	    		'getDynamic': {'method': 'GET', 'params': {'type': 'dynamic'}, isArray: true}
	    	});
	})

	.factory('User', function($resource) {
	    return $resource('/api/users/:id');
	})



//================================================
//  NOTES
//================================================


/* Resource-API */

	// $resource('URI', 
	// 		{apiKey: 'yourAPIKey'},
	// 		{update: {method: 'PUT'} }
	// 	);


/* Alternative approach,	*
 * using $http				*
 * instead of $request		*/

	// .factory('displayFactory', ['$http', 'config', function($http, config) {

	// 	var urlBase = config.API + 'displays';
	// 	var displayFactory = {};

	// 	displayFactory.getDisplays = function() {
	// 		return $http.get(urlBase);
	// 	}

	// 	displayFactory.getDisplay = function( id ) {
	// 		return $http.get(urlBase + '/' + id);
	// 	}

	// 	displayFactory.addDisplay = function ( display ) {
	// 		return $http.post(urlBase, display);
	// 	}

	// 	displayFactory.deleteDisplay = function ( display ) {
	// 		return $http.delete(urlBase + '/' + display._id);
	// 	}

	// 	return displayFactory;
	// }])

