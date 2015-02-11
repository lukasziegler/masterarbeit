var app = angular.module('pdsurvey')

	.factory('displayModelFactory', ['$http', 'config', function($http, config) {

		var urlBase = config.API + 'displayModels';
		var displayModelFactory = {};

		displayModelFactory.getDisplayModels = function() {
			return $http.get(urlBase);
		}

		displayModelFactory.getDisplayModel = function( id ) {
			return $http.get(urlBase + '/' + id);
		}

		displayModelFactory.deleteDisplayModel = function ( display ) {
			return $http.delete(urlBase + '/' + display._id);
		}

		return displayModelFactory;
	}])