var app = angular.module("pdsurvey");

app.controller("QuestionTypeListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestionType = function(questionType) {
		$http.delete("http://localhost:3000/api/questionTypes/" + questionType._id)
			.success(function(response) {
				var index = $scope.questionTypes.indexOf(questionType)
				$scope.questionTypes.splice(index, 1);     
			});
	};

});