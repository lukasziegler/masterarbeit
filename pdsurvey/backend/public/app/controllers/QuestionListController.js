var app = angular.module("pdsurvey");

app.controller("QuestionListController", function($scope, $http) {
	
	$http.get("http://localhost:3000/api/questions").success(function(response) {
		$scope.questions = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.deleteQuestion = function(question) {
		$http.delete("http://localhost:3000/api/questions/" + question._id)
			.success(function(response) {
				var index = $scope.questions.indexOf(question)
				$scope.questions.splice(index, 1);     
			});
	};

});