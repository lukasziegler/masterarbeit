var app = angular.module('pdsurvey')

	.factory('displayFactory', ['$http', 'config', function($http, config) {

		var urlBase = config.API + 'displays';
		var displayFactory = {};

		displayFactory.getDisplays = function() {
			return $http.get(urlBase);
		}

		displayFactory.getDisplay = function( id ) {
			return $http.get(urlBase + '/' + id);
		}

		displayFactory.addDisplay = function ( display ) {
			return $http.post(urlBase, display);
		}

		displayFactory.deleteDisplay = function ( display ) {
			return $http.delete(urlBase + '/' + display._id);
		}

		return displayFactory;
	}])