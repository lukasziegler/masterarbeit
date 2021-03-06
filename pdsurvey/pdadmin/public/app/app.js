var app = angular.module('pdsurvey', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 
	'mgcrea.ngStrap', 'pdWizard', 'pdAuthentication']);

// Constants (Config)
app.constant('config', { API: 'http://localhost:3000/api/', frontend: 'http://localhost:3000' } );

// Root Scope
app.run(function($rootScope, authService) {
	$rootScope.user = "lukas";
	$rootScope.userId = "54a6b51a276762fc510bb0f0";

	$rootScope.getUserRole = function() {
		return authService.getUserRole();
	}



});

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
	console.log($location)
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}])

// Routing
app.config(function($routeProvider, $httpProvider, $locationProvider, $modalProvider, $datepickerProvider) {


    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get(config.API + '/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });


    //================================================
    // Define all routes
    //================================================

	$routeProvider
		/* USERS */
		.when("/users", {
			templateUrl: "/admin/app/users/templates/list.html",
			controller: "UserListController"
		})
		.when("/users/new", {
			templateUrl: "/admin/app/users/templates/create.html",
			controller: "UserCreateController"
		})
		.when("/users/:id/edit", {
			templateUrl: "/admin/app/users/templates/edit.html",
			controller: "UserEditController"
		})

		/* USERS LOGIN */
		.when("/login", {
			templateUrl: "/admin/app/authentication/templates/login.html",
			controller: "AuthenticationController"
		})

		/* RESPONSES */
		.when("/responses", {
			templateUrl: "/admin/app/responses/templates/list.html",
			controller: "ResponseListController"
		})

		/* QUESTIONS */
		.when("/questions", {
			templateUrl: "/admin/app/questions/templates/list.html",
			controller: "QuestionListController"
		})
		.when("/questions/new", {
			templateUrl: "/admin/app/questions/templates/create.html",
			controller: "QuestionCreateController"
		})
		.when("/questions/:id/edit", {
			templateUrl: "/admin/app/questions/templates/edit.html",
			controller: "QuestionEditController"
		})

		/* QUESTION TYPES */
		.when("/questionTypes", {
			templateUrl: "/admin/app/questionTypes/templates/list.html",
			controller: "QuestionTypeListController"
		})
		.when("/questionTypes/new", {
			templateUrl: "/admin/app/questionTypes/templates/create.html",
			controller: "QuestionTypeCreateController"
		})
		.when("/questionTypes/:id/edit", {
			templateUrl: "/admin/app/questionTypes/templates/edit.html",
			controller: "QuestionTypeEditController"
		})

		/* CATEGORIES */
		.when("/categories", {
			templateUrl: "/admin/app/categories/templates/list.html",
			controller: "CategoryListController"
		})
		.when("/categories/new", {
			templateUrl: "/admin/app/categories/templates/create.html",
			controller: "CategoryCreateController"
		})
		.when("/categories/:id/edit", {
			templateUrl: "/admin/app/categories/templates/edit.html",
			controller: "CategoryEditController"
		})
		.when("/categories/:id/", {
			templateUrl: "/admin/app/categories/templates/view.html",
			controller: "CategoryViewController"
		})

		/* SURVEYS */
		.when("/surveys", {
			templateUrl: "/admin/app/surveys/templates/list.html",
			controller: "SurveyListController"
		})
		.when("/surveys/new", {
			templateUrl: "/admin/app/surveys/templates/create.html",
			controller: "SurveyCreateController"
		})
		.when("/surveys/:id/edit", {
			templateUrl: "/admin/app/surveys/templates/edit.html",
			controller: "SurveyEditController"
		})

		/* CAMPAIGNS */
		.when("/campaigns", {
			templateUrl: "/admin/app/campaigns/templates/list.html",
			controller: "CampaignListController"
		})
		.when("/campaigns/new", {
			templateUrl: "/admin/app/campaigns/templates/create.html",
			controller: "CampaignCreateController"
		})
		.when("/campaigns/:id/edit", {
			templateUrl: "/admin/app/campaigns/templates/edit.html",
			controller: "CampaignEditController"
		})
		.when("/campaigns/:id/responses", {
			templateUrl: "/admin/app/campaigns/templates/responses.html",
			controller: "CampaignResponseController"
		})

		/* DISPLAY MODELS */
		.when("/displayModels", {
			templateUrl: "/admin/app/displayModels/templates/list.html",
			controller: "DisplayModelListController"
		})
		.when("/displayModels/new", {
			templateUrl: "/admin/app/displayModels/templates/create.html",
			controller: "DisplayModelCreateController"
		})
		.when("/displayModels/:id/edit", {
			templateUrl: "/admin/app/displayModels/templates/edit.html",
			controller: "DisplayModelEditController"
		})

		/* DISPLAYS */
		.when("/displays", {
			templateUrl: "/admin/app/displays/templates/list.html",
			controller: "DisplayListController"
		})
		.when("/displays/new", {
			templateUrl: "/admin/app/displays/templates/create.html",
			controller: "DisplayCreateController"
		})
		.when("/displays/:id/edit", {
			templateUrl: "/admin/app/displays/templates/edit.html",
			controller: "DisplayEditController"
		})

		/* CONTEXTS */
		.when("/contexts", {
			templateUrl: "/admin/app/contexts/templates/list.html",
			controller: "ContextListController"
		})
		.when("/contexts/new", {
			templateUrl: "/admin/app/contexts/templates/create.html",
			controller: "ContextCreateController"
		})
		.when("/contexts/:id/edit", {
			templateUrl: "/admin/app/contexts/templates/edit.html",
			controller: "ContextEditController"
		})

		/* WIZARD / GETTING STARTED */
		.when("/wizard", {
			templateUrl: "/admin/app/wizard/templates/index.html",
			controller: "WizardController"
		})
		.when("/wizard/:tab", {
			templateUrl: "/admin/app/wizard/templates/index.html",
			controller: "WizardController"
		})

		/* SETTINGS */
		.when("/settings", {
			templateUrl: "/admin/app/settings/templates/index.html",
			controller: "SettingsController"
		})

		/* DASHBOARD */
		.when("/", {
			templateUrl: "/admin/app/dashboard/templates/overview.html",
			controller: "DashboardController"
		})

		// .otherwise({redirectTo: "/"})
	

	//================================================
    // Activate HTML5 Mode Routing (remove the ...//...)
    //================================================

	$locationProvider.html5Mode(true);


    //================================================
    // AngularStrap: Configure Modules
    //================================================

    // Popups (Modals)
	angular.extend($modalProvider.defaults, {
		html: true
	});

	// Time/Date Picker
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'mediumDate'
		// startWeek: 1
	});


});
