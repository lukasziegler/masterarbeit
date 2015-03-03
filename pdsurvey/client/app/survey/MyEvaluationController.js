var app = angular.module("pdclient")


.controller("MyEvaluationController", function($scope, $http, $rootScope) {	

	var campaignId = "54f32bfffbf2d90e000a2cbf";
	$scope.completed = false;

	// counters for survey (i), section (j) and question (k)
	var i = 0;	// survey
	var j = 0;	// section
	var k = 0; 	// question

    var lastQuestion = 0;
    var lastSection = 0;
    var lastSurvey = 0;

	$scope.surveys = {};
	$scope.questionTypeTemplate = '';

	$scope.currentQuestion = {};		// ... displayed on the screen
	$scope.currentQuestionType = {};	// used for ngInclude


	// initializing Response object
	$scope.response = { "question": { "id": "", "type": "", "wording": ""}, 
		"answer": "", "display": "5494310cf4e2b1000004bcb8", "campaign": "",
		"survey": "", "session": 1, "options": []};


	// load QuesitonTypes
	$http.get($rootScope.restApi + "/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});


	// load Questions
	$http.get($rootScope.restApi + "/campaigns/" + campaignId + "/questions").success(function(response) {
		$scope.surveys = response.surveys;

		// check if no surveys are linked
		if ($scope.surveys.length === 0) {
			console.log("No surveys found");
			$scope.error = "No surveys found";
		}
		else {
			// start with first question
// console.log("$scope.surveys",response)
			$scope.loadNextQuestion();
		}

	}).error(function(err) {
		console.err("Invalid CampaignID");
		$scope.error = err;
	});


	// load loadNextQuestion
	$scope.loadNextQuestion = function() {

        // helpers
        lastQuestion = $scope.surveys[i].sections[j].questions.length;
        lastSection = $scope.surveys[i].sections.length;
        lastSurvey = $scope.surveys.length;

        // update Question object ViewModel
    	$scope.currentQuestion = $scope.surveys[i].sections[j].questions[k];

    	// find corresponding questionType
		var newQuesitonType = $scope.questionTypes.filter(function( obj ) {
		  return obj._id == $scope.currentQuestion.type;
		});

		// Initialization for Checkbodes / Multiple-choice
		// if (typeof $scope.currentQuestion.options != undefined)
		// 	$scope.response.answer = [];


		// update QuestionType
		$scope.currentQuestionType = newQuesitonType[0];
    	$scope.questionTypeTemplate = 'app/survey/questionTypes/'+$scope.currentQuestionType.params.type+'.html';
		
// console.log("vars",i,j,k, $scope.currentQuestion)

        // update Response object
        $scope.response.question.id = $scope.currentQuestion._id;
        $scope.response.question.type = $scope.currentQuestion.type;
        $scope.response.question.wording = $scope.currentQuestion.question;

        $scope.response.display = $rootScope.displayId;
        $scope.response.campaign = campaignId;
        $scope.response.survey = $scope.surveys[i]._id;
	}

	$scope.determineNextQuestion = function() {

		// determine next question (k) of section (j) of survey (i)
		if (k === lastQuestion-1 && j === lastSection-1 && i === lastSurvey-1) {
			$scope.completed = true;
			i = 0; j = 0; k = 0;
			console.log("4: completed")

		} else if (k === lastQuestion-1 && j === lastSection-1 && i < lastSurvey-1) {
			i++;
			k = 0; j = 0;
			// console.log("3: next survey")

		} else if (k === lastQuestion-1 && j < lastSection-1) {
			j++;	// next section
			k = 0;	// first question
			// console.log("2: next section")

		} else {
			k++;	// next question
			// console.log("1: next question")
		}

        // update ViewModel
        $scope.loadNextQuestion();
	}


	/* Helper Functions for QuestionTypes */
	$scope.getNumRadioButtons = function() {
		return new Array($scope.currentQuestionType.params.num);  
	}

	// toggle selection a option-field (checkbox/multiple-choice)
	$scope.toggleSelection = function(option) {

		/* Dynamic initialization of $scope.response.answer to []
		 * see above... */

		// var firstStart = true;

		// if (firstStart &&
		// 	$scope.currentQuestion.options.constructor === Array) {
		// 	$scope.response.answer = [];
		// 	firstStart = false;
		// }

		var idx = $scope.response.options.indexOf(option);

		// is currently selected
		if (idx > -1) {
			$scope.response.options.splice(idx, 1);
		}

		// is newly selected
		else {
			$scope.response.options.push(option);
		}
			
	};


	/* Currently not really needed */
	$scope.restart = function() {
		$scope.completed = false;
		// clear last response from view
		$scope.resetQuestion();
	};

	$scope.resetQuestion = function() {
		// clear last response from view
		$scope.response.answer = "";
		$scope.response.options = [];
	};

	var stringifyCheckboxes = function() {
		var stringValue = "";

		for (var i = 0; i < $scope.response.options.length; i++) {
			stringValue += $scope.response.options[i] + ";";
		};

		return stringValue;
	};


	// Submit Response
	$scope.submit = function() {

		if( $scope.response.options.length > 0) {
			$scope.response.answer = stringifyCheckboxes();
		}

		if( $scope.response.answer == '') {
			alert('Response is empty');
			return;
		}

		$http.post($rootScope.restApi + "/responses", $scope.response)
			.success(function(response) {
				console.log("successfully submitted response:", $scope.response.answer);
				$scope.resetQuestion();
				$scope.determineNextQuestion();
			})
			.error(function(response) {
				console.log("error sending response");
				alert("Error submitting response");
			});
	}

})
