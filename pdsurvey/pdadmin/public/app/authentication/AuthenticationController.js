var authentication = angular.module('pdAuthentication', [])

.controller("AuthenticationController", function($scope, $http, $rootScope, $location, config) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
  	console.log("BEFORE", $scope.user)

    $http.post('http://localhost:3333/login', {
      email: $scope.user.email,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      // $location.url('/wizard');
		console.log("SUCCESS", $scope.user)
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      // $location.url('/displays');
      console.log("ERROR", $scope.user)
    });
  };
})
