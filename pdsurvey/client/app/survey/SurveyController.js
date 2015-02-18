var app = angular.module("pdclient")


//================================================
// DIRECTIVES
//================================================

app.directive('pdLoadQuestionType', function ($compile) {
  return {
    restrict: 'A',
    replace: false,
    link: function (scope, element, attrs) {
      scope.$watch(attrs.pdLoadQuestionType, function() {

      	// var param = scope.question;

      	/* FOR DEV PURPOSES */
        // var param = {"type": "radio", "num": 5, "minLabel": "I do not agree", "maxLabel": "I agree"};
        // var param = {"type": "radio", "num": 7, "minLabel": "I do not agree", "maxLabel": "I agree"};
        // var param = {"type": "radio", "num": 2, "minLabel": "No", "maxLabel": "Yes"};
        var param = {"type": "text"};
        // var param = {"type": "number"};

        /** Generate Question Type **/
        var str = '';

        // 1) RADIO BUTTONS
        if (param.type === "radio") {
        	str += '<div class="radio-button">';

        	for (var i = 1; i <= param.num; i++) {

        		if (i == 1)	
        			str += '<label class="radio-label" for="radio'+i+'">'+param.minLabel+' </label>'; 

        		str += '<label class="radio-inline"><input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radio'+i+'" value="'+i+'" class="input-lg">'+i+'</label>';

        		if (param.num > 7 && i%5 == 0 && i != param.num)
        			str+= "<br>";

        		if (i == param.num) 
        			str += '<label class="radio-label" for="radio'+i+'"> '+param.maxLabel+'</label>'; 
        	}

        	str += '</div>';



        // 2) TEXT FIELD
        } else if (param.type === "text") {
        	str += '<input type="text" ng-model="response.answer" class="form-control" placeholder="Your Response" required>';

        // 3) NUMBER FIELD
        } else if (param.type === "number") {
        	str += '<input type="number" ng-model="response.answer" class="form-control" placeholder="How many?" required>';

        }

        // add Question to DOM
        var question = angular.element($compile(str)(scope));
        element.append(question);

        // Dev Purposes
        // var e1 = angular.element($compile('<input type="text" ng-model="response.answer" class="form-control" placeholder="Demo1" required>')(scope));
        // element.append(e1);
	    
      });
    }
  };
});




//================================================
// CONTROLLER
//================================================


app.controller("SurveyCampaignController", function($scope, $http, $rootScope, $routeParams) {	

	var campaignId = $routeParams.id;

	// initializing Response object
	$scope.response = { "question": { "id": "", "type": "", "wording": ""}, 
		"answer": "", "questionnaire": { "type": "", "ref": ""}, 
		"display": "5494310cf4e2b1000004bcb8", "session": 1};


	// load QuesitonTypes
	$http.get($rootScope.restApi + "/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// load Questions
	$http.get($rootScope.restApi + "/campaigns/" + campaignId + "/questions").success(function(response) {
		$scope.questions = response;
		console.log(response)
	}).error(function(err) {
		alert("Invalid CampaignID");
		$scope.error = err;
	});





})






app.controller("SurveyRandomController", function($scope, $http, $rootScope) {	

	var questionTypes = [];

	// initializing Response object
	$scope.response = { "question": { "id": "", "type": "", "wording": ""}, 
		"answer": "", "questionnaire": { "type": "", "ref": ""}, 
		"display": "5494310cf4e2b1000004bcb8", "session": 1};


	/* Load Questionnaires (old approach, with rand()) */

	$http.get($rootScope.restApi + "/surveys").success(function(response) {
		$scope.questionnaires = response;
		$scope.nextQuestion();
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.nextQuestion = function() {
		var randSurvey = 0, 
			randSection = 0,
			randQuestion = 0;

		if (typeof $scope.questionnaires !== 'undefined') {
			// choose random question
	        randSurvey = Math.floor(Math.random() * $scope.questionnaires.length);
	        randSection = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections.length);
	        randQuestion = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections[randSection].questions.length);

	        // check whether Question has been asked already
	        	// TODO
	        	// + clear blackList again in setQuestionType()

        	console.log($scope.question)

	        // update Question object for View
	        $scope.question = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion];

	        // update Response object
	        $scope.response.question.id = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion]._id;
	        $scope.response.question.type = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion].type;
	        $scope.response.question.wording = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion].question;
	        $scope.response.questionnaire.type = "StandardSurvey";
	        $scope.response.questionnaire.ref = $scope.questionnaires[randSurvey]._id;

	        // clear last response from 
	        $scope.resetQuestion();
		}
	};

	/* Currently not really needed */
	$scope.resetQuestion = function() {
		// clear last response from view
		$scope.response.answer = "";
	};


	// Submit Response
	$scope.submit = function() {
		if( $scope.response.answer == '') {
			alert('Response is empty');
			return;
		}

		$http.post("http://localhost:3000/api/responses", $scope.response)
			.success(function(response) {
				console.log("successfully submitted response:", $scope.response.answer);
				$scope.nextQuestion();
			})
			.error(function(response) {
				console.log("error sending response");
				alert("Error submitting response");
			});
	};
})

