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
					    '</div>'+
					'</div>',
		link: function(scope, elem, attrs) {

			scope.prevPillShow = function() {
				return scope.tabs.activeTab == 0;
			}
			scope.nextPillShow = function() {
				if( scope.tabs.activeTab == scope.tabs.length-1)
					return true;
				else
					return false;
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
		template: '<button class="btn btn-default" type="button" ng-click="saveDisplay()" title="Add Display"><i class="fa fa-plus"></i></button>',
		link: function(scope, elem, attrs) {
			scope.saveDisplay = function() {

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


// .directive('pdToggleDisplay', function() {

// 	return {
// 		restrict: 'A',
// 		replace: true,
// 		template: '<a class="btn btn-primary pull-right" ng-click="addDisplay(display)">Select</a>',
// 		link: function(scope, elem, attrs) {

// 			// scope.addDisplay = function(display) {

// 			// 	var index = scope.myDisplays.indexOf(display);

// 			// 	if (index == -1) {
// 			// 		scope.myDisplays.push(display);		// add

// 			// 	}
// 			// 	else {
// 			// 		scope.myDisplays.splice(index, 1);	// remove
// 			// 		var action = 'select';
// 			// 	}
// 			// };

// 		}
// 	}
// })


.directive('pdToggleSurvey', function() {

	var action = 'select';

	var getTemplate = function(action) {
		if (action === 'select')
			return '<a class="btn btn-primary" ng-click="addExistingSurvey(survey)">Select</a>';
		else if (action === 'deselect')
			return '<a class="btn btn-success" ng-click="addExistingSurvey(survey)">Deselect</a>';
	}

	return {
		restrict: 'A',
		replace: true,
		template: getTemplate(action),
		link: function(scope, elem, attrs) {

			scope.addExistingSurvey = function(survey) {

				var index = scope.mySurveys.indexOf(survey);

				// console.log(elem)
				// $(this).removeClass('btn-primary').addClass('btn-success');
				// $(this).text('test');

				if (index == -1) {
					scope.mySurveys.push(survey);		// add

				}
				else {
					scope.mySurveys.splice(index, 1);	// remove
					var action = 'select';
				}
			};

		}
	}
})

.directive('pdRemoveSurvey', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeSurvey(survey)" title="Remove Survey"><i class="fa fa-minus"></i></button>',
		link: function(scope, elem, attrs) {

			scope.removeSurvey = function(survey) {
				var index = scope.mySurveys.indexOf(survey);
				scope.mySurveys.splice(index, 1);     
			};

		}
	};
})


//================================================
// CONTROLLERS
//================================================

.controller("WizardController", function($scope, $routeParams, $location, 
	Display, DisplayModel, Context, StandardizedSurvey, Category, QuestionType) {
	
	// Tabs for Wizard
	$scope.tabs = [
		{title:'Choose Displays', url: 'display', template: '/app/wizard/templates/_display.html', hint: 'First add all displays you own to the PDSurvey plattform. This allows you to assign questionnaires to specific displays and to evaluate key differences between individual displays. Many display models already exist in our database. In case your display type is missing, please take the time to add it to the system.'},
		{title:'Choose Surveys', url: 'survey', template: '/app/wizard/templates/_survey.html', hint: 'asdf'},
		{title:'Manage Campaigns', url: 'campaign', template: '/app/wizard/templates/_campaign.html', hint: 'In order to carry out surveys you first need to create a campaign and assign displays and surveys to it. In the next step you can configure and launch your campaigns.'},
		{title:'Configuration', url: 'options', template: '/app/wizard/templates/_configuration.html', hint: 'This step is optional. Here you can configure optional settings for your campaign.'},
		{title:'Publish', url: 'embedcode', template: '/app/wizard/templates/_embedCode.html', hint: 'All there is left to do is to embed the following Java Script code at the bottom of your application code.'}
	];
	$scope.tabs.activeTab = 0;

	initTabs();

	function initTabs() {
		// Update Tab on first page load (deep linking functionality)
		for (var i = 0; i < $scope.tabs.length; i++) {
			if ($scope.tabs[i].url === $routeParams.tab) {
				$scope.tabs.activeTab = i;
				break;
			}
		};	
	}
	
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
		else return -1;
	};

	// Check whether the user has selected Displays & Surveys
	$scope.readyToConfigure = function() {
		if ($scope.myDisplays.length == 0 || $scope.mySurveys.length == 0)
			return false;
		else
			return true;
	};



	/* * * * * * * * * * * * * * * * * *
	/*  1) DISPLAY 
	/* * * * * * * * * * * * * * * * * */

	$scope.myDisplays = [];		// list of selected displays
	$scope.displays = [];		// list of available displays
	$scope.display = {};		// new display (needed for prototypical inheritance)
	$scope.displayMode = 0;		// 0 = fresh start, 1 = choose existing, 2 = add new survey


	$scope.setDisplayMode = function(i) {
		if (i >= 0 && i < 3) {
			$scope.displayMode = i;
		}

		switch (i) {
			case 1: 	// load existing surveys
				break;
			case 2:  	// add new Display
				break;
		}
	}

	// Load displays
	Display.query(function(data) {
		$scope.displays = data;
	});

	$scope.displayModels = [];
	$scope.dynamicContexts = [];
	$scope.contextDynamic = [];

	// Load Display Models (for Autocomplete)
	DisplayModel.query(function(data) {
		$scope.displayModels = data;
	});

	// Load Context (for Autocomplete)
	Context.getDynamic(function(data) {
		$scope.dynamicContexts = data;
	});

	$scope.saveDisplay = function() {

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

	$scope.addDisplay = function(display) {

		var index = $scope.myDisplays.indexOf(display);

		if (index == -1)
			$scope.myDisplays.push(display);		// add
		else
			$scope.myDisplays.splice(index, 1);		// remove
	};

	$scope.isDisplaySelected = function(display) {
		if ($scope.myDisplays.indexOf(display) == -1)
			return false;
		else
			return true;
	}

	/* * * * * * * * */
	/*   2) SURVEY   */
	/* * * * * * * * */

	$scope.mySurveys = [];		// list of selected surveys
	$scope.surveys = [];		// list of available surveys
	$scope.surveyMode = 0;		// 0 = fresh start, 1 = choose existing, 2 = add new survey

	$scope.setSurveyMode = function(i) {
		if (i >= 0 && i < 3) {
			$scope.surveyMode = i;
		}

		switch (i) {
			case 1:
				StandardizedSurvey.query(function(data) {
					$scope.surveys = data;
				});
				break;

			case 2: 
				break;
		}
	}

	// init for new survey
	$scope.questionnaire  = {"name":"", "category":"", "description":"", 
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
	$scope.categories  = {};

	// load supplementary data
	Category.query(function(data) {
		$scope.categories = data;
	});

	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	});


	$scope.addNewSurvey = function() {
		StandardizedSurvey.save($scope.questionnaire, function() {
			$scope.mySurveys.push($scope.questionnaire);
		}, function(err) {
			$scope.error = err;
		});
	}

	// $scope.addExistingSurvey = function(survey) {
	// 	var index = $scope.mySurveys.indexOf(survey);

	// 	if (index == -1)
	// 		$scope.mySurveys.push(survey);		// add
	// 	else
	// 		$scope.mySurveys.splice(index, 1);	// remove
	// }



	/* * * * * * * * * */
	/*   3) CAMPAIGN   */
	/* * * * * * * * * */



	/* * * * * * * * * */
	/*  5) EMBED CODE  */
	/* * * * * * * * * */

	$scope.embedCode = "<script>"
		+ "var jQl={q:[],dq:[],gs:[],ready:function(a){'function'==typeof a&&jQl.q.push(a);return jQl},getScript:function(a,c){jQl.gs.push([a,c])},unq:function(){for(var a=0;a<jQl.q.length;a++)jQl.q[a]();jQl.q=[]},ungs:function(){for(var a=0;a<jQl.gs.length;a++)jQuery.getScript(jQl.gs[a][0],jQl.gs[a][1]);jQl.gs=[]},bId:null,boot:function(a){'undefined'==typeof window.jQuery.fn?jQl.bId||(jQl.bId=setInterval(function(){jQl.boot(a)},25)):(jQl.bId&&clearInterval(jQl.bId),jQl.bId=0,jQl.unqjQdep(),jQl.ungs(),jQuery(jQl.unq()), 'function'==typeof a&&a())},booted:function(){return 0===jQl.bId},loadjQ:function(a,c){setTimeout(function(){var b=document.createElement('script');b.src=a;document.getElementsByTagName('head')[0].appendChild(b)},1);jQl.boot(c)},loadjQdep:function(a){jQl.loadxhr(a,jQl.qdep)},qdep:function(a){a&&('undefined'!==typeof window.jQuery.fn&&!jQl.dq.length?jQl.rs(a):jQl.dq.push(a))},unqjQdep:function(){if('undefined'==typeof window.jQuery.fn)setTimeout(jQl.unqjQdep,50);else{for(var a=0;a<jQl.dq.length;a++)jQl.rs(jQl.dq[a]); jQl.dq=[]}},rs:function(a){var c=document.createElement('script');document.getElementsByTagName('head')[0].appendChild(c);c.text=a},loadxhr:function(a,c){var b;b=jQl.getxo();b.onreadystatechange=function(){4!=b.readyState||200!=b.status||c(b.responseText,a)};try{b.open('GET',a,!0),b.send('')}catch(d){}},getxo:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],d=0;d<b.length;++d){try{a= new ActiveXObject(b[d])}catch(e){continue}break}}finally{return a}}};if('undefined'==typeof window.jQuery){var $=jQl.ready,jQuery=$;$.getScript=jQl.getScript}; jQl.loadjQ('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js') var _paq = _paq || []; (function () {     var u = (('https:' == document.location.protocol) ? 'https://localhost:3000/' : 'http://localhost:3000/'); var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0]; g.type = 'text/javascript'; g.defer = true; g.async = true; g.src = u + 'tracking/survey.js'; s.parentNode.insertBefore(g, s); })();"
		+ "</script>";



	/* * * * * * * * * * * */
	/*  6) CONGRATULATION  */
	/* * * * * * * * * * * */




})