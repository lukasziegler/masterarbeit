var app = angular.module("pdsurvey")


/** Question Types **/

var htmlQuestionType1 = '            <label for="radioOption1">I do not agree </label>'+
            '<label class="radio-inline">'+
                '<input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radioOption1" value="1">1'+
            '</label>'+
            '<label class="radio-inline">'+
                '<input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radioOption2" value="2">2'+
            '</label>'+
            '<label class="radio-inline">'+
                '<input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radioOption3" value="3">3'+
            '</label>'+
            '<label class="radio-inline">'+
                '<input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radioOption4" value="4">4'+
            '</label>'+
            '<label class="radio-inline">'+
                '<input type="radio" ng-model="response.answer" name="optionsRadiosInline" id="radioOption5" value="5">5'+
            '</label>'+
            '<label for="radioOption5"> I agree</label>';

var htmlQuestionType = '            <input type="text" ng-model="response.answer" class="form-control" placeholder="Your Response" required>';



/** Directives **/

app.directive('pdLoadQuestionType', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.pdLoadQuestionType, function() {
      	// console.log("Type", attrs.pdLoadQuestionType);
        ele.html(htmlQuestionType);
        $compile(ele.contents())(scope);
      });
    }
  };
});



/* Controller */
app.controller("SurveyController", function($scope, $http, $rootScope) {	

	// initializing Response object
	$scope.response = { "question": { "id": "", "type": "", "wording": ""}, 
		"answer": "", "questionnaire": { "type": "", "ref": ""}, 
		"display": "5494310cf4e2b1000004bcb8", "session": 1};

	// load Questionnaires
	$http.get($rootScope.restApi + "/standardSurvey").success(function(response) {
		$scope.questionnaires = response;
		$scope.nextQuestion();
	}).error(function(err) {
		$scope.error = err;
	});

	// Debug: functions
	$scope.numQuestions = function(sections) {
		var num = 0;
		for (var i = 0; i < sections.length; i++) {
			num += sections[i].questions.length;
		};
		return num;
	};

	$scope.nextQuestion = function() {
		var randSurvey = 0, 
			randSection = 0,
			randQuestion = 0;

		if (typeof $scope.questionnaires !== 'undefined') {
			// choose random question
	        randSurvey = Math.floor(Math.random() * $scope.questionnaires.length);
	        randSection = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections.length);
	        randQuestion = Math.floor(Math.random() * $scope.questionnaires[randSurvey].sections[randSection].questions.length);

	        // update Question object for View
	        $scope.question = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion];

	        // update Response object
	        $scope.response.question.id = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion]._id;
	        $scope.response.question.type = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion].type;
	        $scope.response.question.wording = $scope.questionnaires[randSurvey].sections[randSection].questions[randQuestion].question;
	        $scope.response.questionnaire.type = "StandardSurvey";
	        $scope.response.questionnaire.ref = $scope.questionnaires[randSurvey]._id;

	        // clear last response from 
	        $scope.setQuestionType($scope.response.question.type);
		}
	};

	/* WIP:
	 * Currently not really needed */
	$scope.setQuestionType = function(type) {
		// clear last response from view
		$scope.response.answer = "";

		// switch(type) {
		// 	case "5489b332aaaad87855ae8328":
		// 		$scope.html1 = htmlQuestionType1;
		// 		return "bar";
		// 		break;
		// 	case "5489b2faaaaad87855ae8327":
		// 		$scope.html1 = htmlQuestionType;
		// 		return "foo";
		// 		break;
		// 	default:
		// 		$scope.questionTypeHTML = "QuestionType not found";
		// }
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