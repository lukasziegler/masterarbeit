var app = angular.module("pdsurvey");


/** LIST **/

app.controller("QuestionTypeListController", function($scope, QuestionType) {
	
	// Load all entries
	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	}, function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestionType = function(questionType) {
		QuestionType.delete({id: questionType._id}, {}, function() {
			var index = $scope.questionTypes.indexOf(questionType)
			$scope.questionTypes.splice(index, 1);     
		}, function(err) {
			$scope.error = err;
		});
	};

});



/** CREATE **/

app.controller("QuestionTypeCreateController", function($scope, $location, QuestionType) {
	$scope.questionType  = {};

	$scope.createQuestionType = function() {
		QuestionType.save($scope.questionType, function() {
			$location.url("/questionTypes");
		}, function(err) {
			$scope.error = err;
		});
	}
});



/** EDIT **/

app.controller("QuestionTypeEditController", function($scope, $location, $routeParams, QuestionType) {
	$scope.questionType  = {};
	var id = $routeParams.id;

	$scope.questionType.params = {};

	// Load data
	QuestionType.get( {id: id}, function(data) {
		$scope.questionType = data;
	}, function(err) {
		$scope.error = err;
	});

	// example JSON string
	$scope.json = {id: 5, value: "test"};

	$scope.jsonText = angular.fromJson({id: 5, value: "test"});


	$scope.saveQuestionType = function() {
		$scope.questionType.$update(function() {
			$location.url("/questionTypes");
		}, function(err) {
			$scope.error = err;
		});
	};
});
