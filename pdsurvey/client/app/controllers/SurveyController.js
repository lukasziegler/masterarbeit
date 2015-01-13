var app = angular.module("pdsurvey")

/* Controller */
app.controller("SurveyController", function($scope, $http, $rootScope) {	
	$scope.message = "Angular.js test -";
	$scope.question = {};

	// load Questionnaires
	$http.get($rootScope.restApi + "/standardSurvey").success(function(response) {
		$scope.questionnaires = response;
		$scope.nextQuestion();

	}).error(function(err) {
		$scope.error = err;
	});

	// functions
	$scope.numQuestions = function(sections) {
		var num = 0;
		for (var i = 0; i < sections.length; i++) {
			num += sections[i].questions.length;
		};
		return num;
	};

	$scope.nextQuestion = function() {

		console.log("TypeOf", typeof $scope.questionnaires);

		var randSurvey = 0, 
			randSection = 0,
			randQuestion = 0;

		if (typeof $scope.questionnaires !== 'undefined') {
	        randSurvey = Math.floor(Math.random() * $scope.questionnaires.length);
	        randSection = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections.length);
	        randQuestion = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections[randSection].questions.length);
	        // console.log("RAND", randSurvey,randSection, randQuestion);

	        $scope.question = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion];
	        
	        // return $scope.nextQuestion;

		} else {
			// return null;
		}
	}
})



        
        // // Ask a random Question
        // var question = $('<div/>').append('<strong>Random Question:</strong> ')

        // var randSurvey = Math.floor(Math.random() * data.length);
        // var randSection = Math.floor(Math.random() * data[randSurvey].sections.length);
        // var randQuestion = Math.floor(Math.random() * data[randSurvey].sections[randSection].questions.length);

        // console.log("RandQuestion:", randSurvey, randSection, randQuestion);

        // question.append( data[randSurvey].sections[randSection].questions[randQuestion].question + '<br>' );
        // var response = $('<a class="btn btn-primary">Respond</a>')

        // question.append(response);
        // container.append(question);