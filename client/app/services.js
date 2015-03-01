var app = angular.module('pdclient')


//================================================
//  REST-API
//================================================

	// Question
	// .factory('Question', function($resource) {
	//     return $resource('/api/questions/:id', { id: '@_id' },
	//     	{
	//     		'update': {'method': 'PUT'}
	//     	});
	// })

	// // Response
	// .factory('Response', function($resource) {
	//     return $resource('/api/responses/:id', { id: '@_id' },
	//     	{
	//     		'update': {'method': 'PUT'}
	//     	});
	// })

	// QuestionType
	.factory('QuestionType', function($resource) {
	    return $resource('/api/questionTypes');
	})