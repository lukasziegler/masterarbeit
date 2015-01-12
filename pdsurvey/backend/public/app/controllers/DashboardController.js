var app = angular.module("pdsurvey");


/** LIST **/

app.controller("DashboardController", function($scope, $http) {
	
	$scope.message = "new User";

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