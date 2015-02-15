var app = angular.module('pdsurvey')


//================================================
//  REST-API
//================================================

	// Question
	.factory('Question', function($resource) {
	    return $resource('/api/questions/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// Response
	.factory('Response', function($resource) {
	    return $resource('/api/responses/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// QuestionType
	.factory('QuestionType', function($resource) {
	    return $resource('/api/questionTypes/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// Category
	.factory('Category', function($resource) {
	    return $resource('/api/categories/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// Survey
	.factory('Survey', function($resource) {
	    return $resource('/api/surveys/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// DisplayModel
	.factory('DisplayModel', function($resource) {
	    return $resource('/api/displayModels/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// Display
	.factory('Display', function($resource) {
	    return $resource('/api/displays/:id', { id: '@_id' },
	    	{
				'update': {'method': 'PUT'}
	    	});
	})

	// Campaign
	.factory('Campaign', function($resource) {
	    return $resource('/api/campaigns/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
	})

	// Context
	.factory('Context', function($resource) {
	    return $resource('/api/contexts/:id', { id: '@_id' },
	    	{
	    		'getStatic': {'method': 'GET', 'params': {'type': 'static'}, isArray: true},
	    		'getDynamic': {'method': 'GET', 'params': {'type': 'dynamic'}, isArray: true},
	    		'update': {'method': 'PUT'}
	    	});
	})

	// User
	.factory('User', function($resource) {
	    return $resource('/api/users/:id', { id: '@_id' },
	    	{
	    		'update': {'method': 'PUT'}
	    	});
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

