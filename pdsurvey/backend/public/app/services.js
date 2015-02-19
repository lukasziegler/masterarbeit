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
	.factory('Campaign', function($resource, config) {

		// REST API 

		var campaign = $resource('/api/campaigns/:id', 
			{ id: '@_id' },
	    	{ 'update': {'method': 'PUT'} });


		// EMBED CODE

		var embedCodePart1 = "<script type=\"text/javascript\">"
			+ "var jQl={q:[],dq:[],gs:[],ready:function(a){'function'==typeof a&&jQl.q.push(a);return jQl},getScript:function(a,c){jQl.gs.push([a,c])},unq:function(){for(var a=0;a<jQl.q.length;a++)jQl.q[a]();jQl.q=[]},ungs:function(){for(var a=0;a<jQl.gs.length;a++)jQuery.getScript(jQl.gs[a][0],jQl.gs[a][1]);jQl.gs=[]},bId:null,boot:function(a){'undefined'==typeof window.jQuery.fn?jQl.bId||(jQl.bId=setInterval(function(){jQl.boot(a)},25)):(jQl.bId&&clearInterval(jQl.bId),jQl.bId=0,jQl.unqjQdep(),jQl.ungs(),jQuery(jQl.unq()), 'function'==typeof a&&a())},booted:function(){return 0===jQl.bId},loadjQ:function(a,c){setTimeout(function(){var b=document.createElement('script');b.src=a;document.getElementsByTagName('head')[0].appendChild(b)},1);jQl.boot(c)},loadjQdep:function(a){jQl.loadxhr(a,jQl.qdep)},qdep:function(a){a&&('undefined'!==typeof window.jQuery.fn&&!jQl.dq.length?jQl.rs(a):jQl.dq.push(a))},unqjQdep:function(){if('undefined'==typeof window.jQuery.fn)setTimeout(jQl.unqjQdep,50);else{for(var a=0;a<jQl.dq.length;a++)jQl.rs(jQl.dq[a]); jQl.dq=[]}},rs:function(a){var c=document.createElement('script');document.getElementsByTagName('head')[0].appendChild(c);c.text=a},loadxhr:function(a,c){var b;b=jQl.getxo();b.onreadystatechange=function(){4!=b.readyState||200!=b.status||c(b.responseText,a)};try{b.open('GET',a,!0),b.send('')}catch(d){}},getxo:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],d=0;d<b.length;++d){try{a= new ActiveXObject(b[d])}catch(e){continue}break}}finally{return a}}};if('undefined'==typeof window.jQuery){var $=jQl.ready,jQuery=$;$.getScript=jQl.getScript}; jQl.loadjQ('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');"
			+ "{ var _paq = _paq || []; }"
			+ "(function () {"
			+ "    var u = (('https:' == document.location.protocol) ? 'https://localhost:3000/' : 'http://localhost:3000/');"
			+ "    var d = document,"
			+ "        g = d.createElement('script'),"
			+ "        s = d.getElementsByTagName('script')[0];"
			+ "    g.type = 'text/javascript';"
			+ "    g.defer = true;"
			+ "    g.async = true;"
			+ "    g.src = u + 'tracking/survey.js?campaign=";

		var embedCodePart2 = "';"
			+ "    s.parentNode.insertBefore(g, s);"
			+ "})();"
			+ "</script>";

		campaign.getEmbedCode = function(id) {
			return embedCodePart1 + id + embedCodePart2;
		}

	    return campaign;
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

