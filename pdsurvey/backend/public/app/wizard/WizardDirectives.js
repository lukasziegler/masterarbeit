var wizard = angular.module('pdWizard', [])


/** DIRECTIVES **/

.directive('pdNextTab', function() {
	return {
		restrict: 'A',
		replace: true,
		template:  '<div class="row">'+
					    '<div class="col-lg-12" >'+
					     '   <a href="" class="btn btn-primary pull-right" ng-click="nextPill()">Next Step</a>'+
					    '</div>'+
					'</div>',
		link: function(scope, elem, attrs) {
			scope.nextPill = function() {
				if (scope.tabs.activeTab == scope.tabs.length-1)
					alert("End of Pills");
				else
					scope.tabs.activeTab++;
			}
		}
	};
})


.directive('pdAddDisplay', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default" type="button" ng-click="addDisplay()" title="Add Display"><i class="fa fa-plus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.addDisplay = function() {

				var name = scope.newDisplay.name;
				var model = scope.newDisplay.type;

				if (name != undefined && model != undefined) {

					// update model
					scope.myDisplays.push( {"name": name,
						"type": model});

					// TODO save to REST / DB

					// clear old values
					scope.newDisplay.name = "";
					scope.newDisplay.type = {};
				}
				else {
					alert("Empty fields");
					// TODO show notification in form fields
				}
			}
		}
	};
})


.directive('pdRemoveDisplay', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeDisplay(display)" title="Remove Display"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.removeDisplay = function(display) {
				var indexDisplay = scope.myDisplays.indexOf(display);
				scope.myDisplays.splice(indexDisplay, 1);     
			};
		}
	};
})