var app = angular.module("pdsurvey");


/** LIST **/

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



/** CREATE **/

app.controller("QuestionTypeCreateController", function($scope, $http, $location) {
	$scope.questionType  = {};

	$scope.createQuestionType = function() {
		$http.post("http://localhost:3000/api/questionTypes", $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	}
});



/** EDIT **/

app.controller("QuestionTypeEditController", function($scope, $http, $location, $routeParams) {
	$scope.questionType  = {};
	var id = $routeParams.id;

	$http.get("http://localhost:3000/api/questionTypes/" + id).success(function(response) {
		$scope.questionType = response;
	});

	$scope.saveQuestionType = function() {
		console.log("id: ",$scope.questionType._id);
		$http.put("http://localhost:3000/api/questionTypes/" + $scope.questionType._id, $scope.questionType)
			.success(function(response) {
				$location.url("/questionTypes");
			});
	};
});
