var app = angular.module("pdsurvey");


/** LIST **/

app.controller("QuestionTypeListController", function($scope, $http, config) {
	
	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestionType = function(questionType) {
		$http.delete(config.API + "questionTypes/" + questionType._id)
			.success(function(response) {
				var index = $scope.questionTypes.indexOf(questionType)
				$scope.questionTypes.splice(index, 1);     
			});
	};

});



/** CREATE **/

app.controller("QuestionTypeCreateController", function($scope, $http, $location, config) {
	$scope.questionType  = {};

	$scope.createQuestionType = function() {
		$http.post(config.API + "questionTypes", $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	}
});



/** EDIT **/

app.controller("QuestionTypeEditController", function($scope, $http, $location, $routeParams, config) {
	$scope.questionType  = {};
	var id = $routeParams.id;

	$http.get(config.API + "questionTypes/" + id).success(function(response) {
		$scope.questionType = response;
	});

	$scope.saveQuestionType = function() {
		console.log("id: ",$scope.questionType._id);
		$http.put(config.API + "questionTypes/" + $scope.questionType._id, $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	};
});
