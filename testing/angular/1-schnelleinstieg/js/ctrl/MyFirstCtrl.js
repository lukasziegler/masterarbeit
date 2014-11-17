function MyFirstCtrl ( $scope ) {
	$scope.myVariable = "wie geil ist das denn :)";	

	$scope.persons = [
		{name: "hans", age: 18},
		{name: "hans2", age: 25},
		{name: "hans3", age: 30}];

	$scope.name = "Lukas";
	$scope.age = 12;

	$scope.click = function() {
		$scope.persons.push( {name: $scope.name, age: $scope.age} );
	};

	$scope.personsLength = $scope.persons.length;

	$scope.getPersonsLength = function() {
		return $scope.persons.length;
	};
}