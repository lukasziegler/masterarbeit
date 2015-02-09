var app = angular.module('pdsurvey', ['ngRoute', 'mgcrea.ngStrap', 
	'pdWizard', 'pdAuthentication']);

// Constants (Config)
app.constant('config', { API: 'http://localhost:3000/api/' } );

// Root Scope
app.run(function($rootScope) {
	$rootScope.user = "lukas";
	$rootScope.userId = "54a6b51a276762fc510bb0f0";
});

// Routing
app.config(function($routeProvider, $httpProvider) {


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
			templateUrl: "/app/users/templates/list.html",
			controller: "UserListController"
		})
		.when("/users/new", {
			templateUrl: "/app/users/templates/create.html",
			controller: "UserCreateController"
		})
		.when("/users/:id/edit", {
			templateUrl: "/app/users/templates/edit.html",
			controller: "UserEditController"
		})

		/* USERS LOGIN */
		.when("/login", {
			templateUrl: "/app/authentication/templates/login.html",
			controller: "AuthenticationController"
		})

		/* RESPONSES */
		.when("/responses", {
			templateUrl: "/app/responses/templates/list.html",
			controller: "ResponseListController"
		})

		/* QUESTIONS */
		.when("/questions", {
			templateUrl: "/app/questions/templates/list.html",
			controller: "QuestionListController"
		})
		.when("/questions/new", {
			templateUrl: "/app/questions/templates/create.html",
			controller: "QuestionCreateController"
		})
		.when("/questions/:id/edit", {
			templateUrl: "/app/questions/templates/edit.html",
			controller: "QuestionEditController"
		})

		/* QUESTION TYPES */
		.when("/questionTypes", {
			templateUrl: "/app/questionTypes/templates/list.html",
			controller: "QuestionTypeListController"
		})
		.when("/questionTypes/new", {
			templateUrl: "/app/questionTypes/templates/create.html",
			controller: "QuestionTypeCreateController"
		})
		.when("/questionTypes/:id/edit", {
			templateUrl: "/app/questionTypes/templates/edit.html",
			controller: "QuestionTypeEditController"
		})

		/* CATEGORIES */
		.when("/categories", {
			templateUrl: "/app/categories/templates/list.html",
			controller: "CategoryListController"
		})
		.when("/categories/new", {
			templateUrl: "/app/categories/templates/create.html",
			controller: "CategoryCreateController"
		})
		.when("/categories/:id/edit", {
			templateUrl: "/app/categories/templates/edit.html",
			controller: "CategoryEditController"
		})
		.when("/categories/:id/", {
			templateUrl: "/app/categories/templates/view.html",
			controller: "CategoryViewController"
		})

		/* SURVEYS */
		.when("/surveys", {
			templateUrl: "/app/surveys/templates/list.html",
			controller: "SurveyListController"
		})
		.when("/surveys/new", {
			templateUrl: "/app/surveys/templates/create.html",
			controller: "SurveyCreateController"
		})
		.when("/surveys/:id/edit", {
			templateUrl: "/app/surveys/templates/edit.html",
			controller: "SurveyEditController"
		})

		/* STANDARDIZED QUESTIONNAIRE / SURVEY */
		.when("/standardizedQuestions", {
			templateUrl: "/app/standardizedQuestions/templates/list.html",
			controller: "StandardizedQuestionListController"
		})
		.when("/standardizedQuestions/new", {
			templateUrl: "/app/standardizedQuestions/templates/create.html",
			controller: "StandardizedQuestionCreateController"
		})
		.when("/standardizedQuestions/:id/edit", {
			templateUrl: "/app/standardizedQuestions/templates/edit.html",
			controller: "StandardizedQuestionEditController"
		})

		/* CAMPAIGNS */
		.when("/campaigns", {
			templateUrl: "/app/campaigns/templates/list.html",
			controller: "CampaignListController"
		})
		.when("/campaigns/new", {
			templateUrl: "/app/campaigns/templates/create.html",
			controller: "CampaignCreateController"
		})
		.when("/campaigns/:id/edit", {
			templateUrl: "/app/campaigns/templates/edit.html",
			controller: "CampaignEditController"
		})

		/* DISPLAY MODELS */
		.when("/displayModels", {
			templateUrl: "/app/displayModels/templates/list.html",
			controller: "DisplayModelListController"
		})
		.when("/displayModels/new", {
			templateUrl: "/app/displayModels/templates/create.html",
			controller: "DisplayModelCreateController"
		})
		.when("/displayModels/:id/edit", {
			templateUrl: "/app/displayModels/templates/edit.html",
			controller: "DisplayModelEditController"
		})

		/* DISPLAYS */
		.when("/displays", {
			templateUrl: "/app/displays/templates/list.html",
			controller: "DisplayListController"
		})
		.when("/displays/new", {
			templateUrl: "/app/displays/templates/create.html",
			controller: "DisplayCreateController"
		})
		.when("/displays/:id/edit", {
			templateUrl: "/app/displays/templates/edit.html",
			controller: "DisplayEditController"
		})

		/* CONTEXTS */
		.when("/contexts", {
			templateUrl: "/app/contexts/templates/list.html",
			controller: "ContextListController"
		})
		.when("/contexts/new", {
			templateUrl: "/app/contexts/templates/create.html",
			controller: "ContextCreateController"
		})
		.when("/contexts/:id/edit", {
			templateUrl: "/app/contexts/templates/edit.html",
			controller: "ContextEditController"
		})

		/* WIZARD / GETTING STARTED */
		.when("/wizard", {
			templateUrl: "/app/wizard/templates/index.html",
			controller: "WizardController"
		})
		.when("/wizard/survey", {
			templateUrl: "/app/wizard/templates/index.html",
			controller: "WizardController"
		})

		/* DASHBOARD */
		.when("/", {
			templateUrl: "/app/dashboard/templates/overview.html",
			controller: "DashboardController"
		})

		.otherwise({redirectTo: "/"})

});
