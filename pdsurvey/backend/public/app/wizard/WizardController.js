var wizard = angular.module('pdWizard', [])


//================================================
// DIRECTIVES
//================================================

.directive('pdNextTab', function() {
	return {
		restrict: 'A',
		replace: true,
		template:  '<div class="row">'+
					    '<div class="col-lg-12" style="padding-bottom: 1.5em;">'+
					     '   <a href="" class="btn btn-default" ng-click="prevPill()" ng-hide="prevPillShow()">Previous Step</a>'+
						 '   <a href="" class="btn btn-success pull-right" ng-click="nextPill()" ng-hide="nextPillShow()">Next Step</a>'+
						 '   <a href="" class="btn btn-warning pull-right" ng-click="nextPill()" ng-show="nextPillShow()">Launch Campaign</a>'+
					    '</div>'+
					'</div>',
		link: function(scope, elem, attrs) {

			scope.prevPillShow = function() {
				return scope.tabs.activeTab == 0;
			}
			scope.nextPillShow = function() {
				return scope.tabs.activeTab == scope.tabs.length-1;
			}


			scope.prevPill = function() {
				if (scope.prevPillShow())
					alert("End of Pills");
				else
					scope.tabs.activeTab--;
			}

			scope.nextPill = function() {
				if (scope.nextPillShow())
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
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeDisplay(myDisplay)" title="Remove Display"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.removeDisplay = function(display) {
				var indexDisplay = scope.myDisplays.indexOf(display);
				scope.myDisplays.splice(indexDisplay, 1);     
			};
		}
	};
})

//================================================
// CONTROLLERS
//================================================

.controller("WizardController", function($scope, $http, $rootScope, $routeParams, $location, config) {
	// Tabs for Wizard
	$scope.tabs = [
		{title:'Add Displays', url: 'display', template: '/app/wizard/templates/_display.html', hint: 'First add all displays you own to the PDSurvey plattform. This allows you to assign questionnaires to specific displays and to evaluate key differences between individual displays. Many display models already exist in our database. In case your display type is missing, please take the time to add it to the system.'},
		{title:'Choose Surveys', url: 'survey', template: '/app/wizard/templates/_survey.html', hint: 'asdf'},
		{title:'Manage Campaigns', url: 'campaign', template: '/app/wizard/templates/_campaign.html', hint: 'In order to carry out surveys you first need to create a campaign and assign displays and surveys to it. In the next step you can configure and launch your campaigns.'},
		{title:'Publish', url: 'embedcode', template: '/app/wizard/templates/_embedCode.html', hint: 'All there is left to do is to embed the following Java Script code at the bottom of your application code.'}
	];
	$scope.tabs.activeTab = 0;

	// Update Tab on first page load (deep linking functionality)
	for (var i = 0; i < $scope.tabs.length; i++) {
		if ($scope.tabs[i].url === $routeParams.tab) {
			$scope.tabs.activeTab = i;
			break;
		}
	};
	
	// Automatically update the URL for the tabs
	$scope.$watch(function(scope) { return $scope.tabs.activeTab },
		function(newValue, oldValue) {
			$location.path('/wizard/' + $scope.tabs[newValue].url, false);
		}
	);
	
	// Respond the Hint text for every tab 
	$scope.getTabHint = function(activeTab) {
		if (activeTab >= 0 && activeTab < $scope.tabs.length) {
			return $scope.tabs[activeTab].hint;
		}
		else 	return -1;
	};



	/* * * * * * * * * * * * * * * * * *
	/*  1) DISPLAY 
	/* * * * * * * * * * * * * * * * * */

	$scope.myDisplays = [];		// list of saved displays
	$scope.display = {};		// new display (needed for prototypical inheritance)

	$http.get(config.API + "users/" + $rootScope.userId + '/displays').success(function(response) {
		$scope.myDisplays = response;
	}).error(function(err) {
		$scope.error = err;
	});


	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	// Load Display Models (for Autocomplete)
	$http.get(config.API + "displayModels/").success(function(response) {
		$scope.displayModels = response;
	}).error(function(err) {
		$scope.error = err;
	});

	// Load Context (for Autocomplete)
	$http.get(config.API + "contexts/dynamic/").success(function(response) {
		$scope.dynamicContexts = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$scope.addDisplay = function() {

		var name = $scope.display.name;
		var model = $scope.display.displayModel;

		if (name != undefined && model != undefined) {

			// update model
			$scope.myDisplays.push( $scope.display );

			// TODO save to REST / DB

			// clear old values
			$scope.display = {};
		}
		else {
			alert("Empty fields");
			// TODO show notification in form fields
		}
	}

	/* * * * * * * * */
	/*   2) SURVEY   */
	/* * * * * * * * */
	$scope.mySurveys = [];
	$scope.surveyMode = 0;

	$scope.setSurveyMode = function(i) {

		if (i >= 0 && i < 3) {
			$scope.surveyMode = i;
		}

		switch (i) {
			case 1:
				$http.get(config.API + "standardSurvey").success(function(response) {
					$scope.surveys = response;
				}).error(function(err) {
					$scope.error = err;
				});
				break;

			case 2: 
				break;
		}
	}

	$scope.questionnaire  = {"name":"", "category":"", "description":"", 
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
	$scope.categories  = {};

	$http.get(config.API + "categories").success(function(response) {
		$scope.categories = response;
	}).error(function(err) {
		$scope.error = err;
	});

	$http.get(config.API + "questionTypes").success(function(response) {
		$scope.questionTypes = response;
	}).error(function(err) {
		$scope.error = err;
	});


	/* * * * * * * * * */
	/*   3) CAMPAIGN   */
	/* * * * * * * * * */

	/* * * * * * * * * */
	/*  4) EMBED CODE  */
	/* * * * * * * * * */

	$scope.embedCode = "<script>"
		+ "var jQl={q:[],dq:[],gs:[],ready:function(a){'function'==typeof a&&jQl.q.push(a);return jQl},getScript:function(a,c){jQl.gs.push([a,c])},unq:function(){for(var a=0;a<jQl.q.length;a++)jQl.q[a]();jQl.q=[]},ungs:function(){for(var a=0;a<jQl.gs.length;a++)jQuery.getScript(jQl.gs[a][0],jQl.gs[a][1]);jQl.gs=[]},bId:null,boot:function(a){'undefined'==typeof window.jQuery.fn?jQl.bId||(jQl.bId=setInterval(function(){jQl.boot(a)},25)):(jQl.bId&&clearInterval(jQl.bId),jQl.bId=0,jQl.unqjQdep(),jQl.ungs(),jQuery(jQl.unq()), 'function'==typeof a&&a())},booted:function(){return 0===jQl.bId},loadjQ:function(a,c){setTimeout(function(){var b=document.createElement('script');b.src=a;document.getElementsByTagName('head')[0].appendChild(b)},1);jQl.boot(c)},loadjQdep:function(a){jQl.loadxhr(a,jQl.qdep)},qdep:function(a){a&&('undefined'!==typeof window.jQuery.fn&&!jQl.dq.length?jQl.rs(a):jQl.dq.push(a))},unqjQdep:function(){if('undefined'==typeof window.jQuery.fn)setTimeout(jQl.unqjQdep,50);else{for(var a=0;a<jQl.dq.length;a++)jQl.rs(jQl.dq[a]); jQl.dq=[]}},rs:function(a){var c=document.createElement('script');document.getElementsByTagName('head')[0].appendChild(c);c.text=a},loadxhr:function(a,c){var b;b=jQl.getxo();b.onreadystatechange=function(){4!=b.readyState||200!=b.status||c(b.responseText,a)};try{b.open('GET',a,!0),b.send('')}catch(d){}},getxo:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],d=0;d<b.length;++d){try{a= new ActiveXObject(b[d])}catch(e){continue}break}}finally{return a}}};if('undefined'==typeof window.jQuery){var $=jQl.ready,jQuery=$;$.getScript=jQl.getScript}; jQl.loadjQ('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js') var _paq = _paq || []; (function () {     var u = (('https:' == document.location.protocol) ? 'https://localhost:3000/' : 'http://localhost:3000/'); var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0]; g.type = 'text/javascript'; g.defer = true; g.async = true; g.src = u + 'tracking/survey.js'; s.parentNode.insertBefore(g, s); })();"
		+ "</script>";


})