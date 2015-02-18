var wizard = angular.module('pdWizard', [])


//================================================
// DIRECTIVES
//================================================

.directive('pdNextTab', function() {
	return {
		restrict: 'A',
		replace: true,
		template:  '<div class="row">'+
					    '<div class="col-lg-12" style="padding-bottom: 1.5em; text-align: right">'+
					     '   <a href="" class="btn btn-default pull-left" ng-click="prevPill()" ng-hide="prevPillShow()">Previous Step</a>'+
						 '   <a href="" class="btn btn-success" ng-class="{\'disabled\': !readyForNextStep()}" ng-if="tabs.activeTab != 2" ng-click="nextPill()" ng-hide="nextPillShow()">Next Step</a>'+
						 '   <a href="" class="btn btn-warning" ng-class="{\'disabled\': !readyForNextStep()}" ng-if="tabs.activeTab == 2" ng-click="configureCampaign()" ng-hide="nextPillShow()">Configure Campaign</a>'+
						 '   <a href="" class="btn btn-warning" ng-class="{\'disabled\': !readyForNextStep()}" ng-if="tabs.activeTab == 3 && !campaign.launched" ng-click="launchCampaign()">Launch Campaign</a>'+
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

			scope.configureCampaign = function() {
				scope.saveCampaign();
				scope.nextPill();
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


.directive('pdRemoveSurvey', function() {
	return {
		restrict: 'A',
		replace: true,
		template: '<button class="btn btn-default pull-right" type="button" ng-click="removeSurvey(mySurvey)" title="Remove Survey"><i class="fa fa-minus"></i></button>',
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

.controller("WizardController", function($scope, $routeParams, $location, config,
	Display, DisplayModel, Context, Survey, Category, QuestionType, Campaign) {
	
	// Tabs for Wizard
	$scope.tabs = [
		{title:'Choose Displays', url: 'display', template: '/app/wizard/templates/_display.html', hint: 'First add all displays you own to the PDSurvey plattform. This allows you to assign questionnaires to specific displays and to evaluate key differences between individual displays. Many display models already exist in our database. In case your display type is missing, please take the time to add it to the system.'},
		{title:'Choose Surveys', url: 'survey', template: '/app/wizard/templates/_survey.html', hint: 'asdf'},
		{title:'Manage Campaigns', url: 'campaign', template: '/app/wizard/templates/_campaign.html', hint: 'In order to carry out surveys you first need to create a campaign and assign displays and surveys to it. In the next step you can configure and launch your campaigns.'},
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

	// validation for content (check for the previous tab)
	$scope.readyToConfigure = function() {

		if ($scope.tabs.activeTab == 1 && $scope.myDisplays.length == 0) {
			return false;
		} else if ($scope.tabs.activeTab == 2 && $scope.mySurveys.length == 0) {
			return false;
		} else if ($scope.tabs.activeTab == 3 && $scope.campaign.name == undefined) {
			return false;
		} else {
			return true;
		}

		// if ($scope.myDisplays.length == 0 && $scope.mySurveys.length == 0) 
		// 	return false;
		// else
		// 	return true;
	};

	// validation for NextTab (check on the tab itself)
	$scope.readyForNextStep = function() {
		if ($scope.tabs.activeTab == 0 && $scope.myDisplays.length == 0) {
			return false;
		} else if ($scope.tabs.activeTab == 1 && $scope.mySurveys.length == 0) {
			return false;
		} else if ($scope.tabs.activeTab == 2 && $scope.campaign.name == undefined) {
			return false;
		} else {
			return true;
		}
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
	getContextDynamic();
	function getContextDynamic() {
		Context.getDynamic(function(data) {
			$scope.dynamicContexts = data;
		});
	}

	$scope.saveDisplay = function() {

		var name = $scope.display.name;
		var model = $scope.display.displayModel;

		// save to DB
		Display.save($scope.display, function() {
			// update model
			$scope.myDisplays.push($scope.display);
			$scope.displays.push($scope.display);

			// clear old values
			$scope.display = {};
			getContextDynamic();
			$scope.contextDynamic = {};

		}, function(err) {
			$scope.error = err;
		});

	}

	// add/remove Display to the myDisplays list
	$scope.toggleDisplay = function(display) {
		var index = $scope.myDisplays.indexOf(display);

		if (index == -1)	// add
			$scope.myDisplays.push(display);
		else 				// remove
			$scope.myDisplays.splice(index, 1);
	};

	// check if the display is part of myDisplays
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
	}

	// load surveys
	Survey.query(function(data) {
		$scope.surveys = data;
	});

	// init for new survey
	$scope.survey  = {"name":"", "category":"", "state": "personal", "description":"", 
		"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};
	$scope.categories  = {};

	// load supplementary data
	Category.query(function(data) {
		$scope.categories = data;
	});

	QuestionType.query(function(data) {
		$scope.questionTypes = data;
	});


	$scope.saveSurvey = function() {
		// save to DB
		Survey.save($scope.survey, function() {

			// update list
			$scope.surveys.push($scope.survey);
			$scope.mySurveys.push($scope.survey);

			// clear form fields
			$scope.survey  = {"name":"", "category":"", "state": "personal", "description":"", 
				"sections":[{"name":"", "questions":[{"question":"", "type":""}]}]};

		}, function(err) {
			$scope.error = err;
		});
	}

	// add/remove Survey to the mySurveys list
	$scope.toggleSurvey = function(survey) {
		var index = $scope.mySurveys.indexOf(survey);

		if (index == -1)	// add
			$scope.mySurveys.push(survey);
		else 				// remove
			$scope.mySurveys.splice(index, 1);
	};

	// check if the survey is part of mySurveys
	$scope.isSurveySelected = function(survey) {
		if ($scope.mySurveys.indexOf(survey) == -1)
			return false;
		else
			return true;
	}

	/* * * * * * * * * */
	/*   3) CAMPAIGN   */
	/* * * * * * * * * */

	$scope.campaign = {};
	$scope.campaignId = "";
	$scope.campaign.displays = [];
	$scope.campaign.surveys = [];


	// call on tab switch (from campaign to embedCode)
	$scope.saveCampaign = function() {
		// for first call of function, create new Campaign (POST)
		if ($scope.campaignId === "") {
			$scope.campaign.contextDynamic = $scope.contextDynamic;

			// copy Lists to Campaign-Object
			campaignHelperCopyLists();

			Campaign.save($scope.campaign, function(response) {
				$scope.campaign = response;
				$scope.campaignId = response._id;

				// update embedCode (add ID)
				$scope.updateEmbedCode($scope.campaignId);

				// check, notify user if it is missing
				if ($scope.campaignId === "")
					alert("Error, CampaignID could not be retrieved. Please try again.");
			}, function(err) {
				$scope.error = err;
			});
		} else {
			// if function is called multiple times, use PUT instead of POST
			$scope.updateCampaign();
		}
	}

	// call when user clicked on 'launch campaign'
	$scope.updateCampaign = function() {
		// copy Lists to Campaign-Object
		campaignHelperCopyLists();

		$scope.campaign.$update(function() {
			if ($scope.campaignId === "")
				alert("Error, CampaignID could not be retrieved. Please try again.");
		}, function(err) {
			$scope.error = err;
		});
	}


	function campaignHelperCopyLists() {
		// clear old IDs
		$scope.campaign.displays = [];
		$scope.campaign.surveys = [];

		// copy DisplayIDs
		for (var i = 0; i < $scope.myDisplays.length; i++) {
			$scope.campaign.displays.push( $scope.myDisplays[i]._id );
		};
		// copy SurveyIDs
		for (var i = 0; i < $scope.mySurveys.length; i++) {
			$scope.campaign.surveys.push( $scope.mySurveys[i]._id );
		}
	}


	/* * * * * * * * * */
	/*  5) EMBED CODE  */
	/* * * * * * * * * */

	// TEMP TEMP TEMP (for faster development)
			$scope.myDisplays = [{'asdf': 'asdf'}];
			$scope.mySurveys = [{'asdf': 'asdf'}];
			$scope.campaign.name = 'asdf';
	// TEMP TEMP TEMP

	$scope.codeCopied = false;
	$scope.campaign.launched = false;

	$scope.copyCode = function() {
		// copy code

			// TODO
			alert("TODO")

		// set flag
		$scope.codeCopied = true;
	}

	$scope.launchCampaign = function() {

		if ($scope.campaignId === "") {
			alert("Error, CampaignID is missing.")
			return;
		}

		// update model + flag vor view
		if ($scope.campaign.launched == false) {
			$scope.campaign.launched = true;
		} else {
			$scope.campaign.launched = false;
		}

		// save changes to DB
		$scope.updateCampaign();
	}


	// EMBED CODE
	$scope.embedCode = "loading ...";
	$scope.surveyUrl = "generating ...";

	$scope.embedCodePart1 = "<script type=\"text/javascript\">"
		+ "var jQl={q:[],dq:[],gs:[],ready:function(a){'function'==typeof a&&jQl.q.push(a);return jQl},getScript:function(a,c){jQl.gs.push([a,c])},unq:function(){for(var a=0;a<jQl.q.length;a++)jQl.q[a]();jQl.q=[]},ungs:function(){for(var a=0;a<jQl.gs.length;a++)jQuery.getScript(jQl.gs[a][0],jQl.gs[a][1]);jQl.gs=[]},bId:null,boot:function(a){'undefined'==typeof window.jQuery.fn?jQl.bId||(jQl.bId=setInterval(function(){jQl.boot(a)},25)):(jQl.bId&&clearInterval(jQl.bId),jQl.bId=0,jQl.unqjQdep(),jQl.ungs(),jQuery(jQl.unq()), 'function'==typeof a&&a())},booted:function(){return 0===jQl.bId},loadjQ:function(a,c){setTimeout(function(){var b=document.createElement('script');b.src=a;document.getElementsByTagName('head')[0].appendChild(b)},1);jQl.boot(c)},loadjQdep:function(a){jQl.loadxhr(a,jQl.qdep)},qdep:function(a){a&&('undefined'!==typeof window.jQuery.fn&&!jQl.dq.length?jQl.rs(a):jQl.dq.push(a))},unqjQdep:function(){if('undefined'==typeof window.jQuery.fn)setTimeout(jQl.unqjQdep,50);else{for(var a=0;a<jQl.dq.length;a++)jQl.rs(jQl.dq[a]); jQl.dq=[]}},rs:function(a){var c=document.createElement('script');document.getElementsByTagName('head')[0].appendChild(c);c.text=a},loadxhr:function(a,c){var b;b=jQl.getxo();b.onreadystatechange=function(){4!=b.readyState||200!=b.status||c(b.responseText,a)};try{b.open('GET',a,!0),b.send('')}catch(d){}},getxo:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],d=0;d<b.length;++d){try{a= new ActiveXObject(b[d])}catch(e){continue}break}}finally{return a}}};if('undefined'==typeof window.jQuery){var $=jQl.ready,jQuery=$;$.getScript=jQl.getScript}; jQl.loadjQ('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');"
		+ "{ var _paq = _paq || []; }"
		+ "(function () {"
		+ "    var u = (('https:' == document.location.protocol) ? 'https://localhost:3000/' : 'http://localhost:3000/');"
		+ "    var d = document,"
		+ "        g = d.createElement('script'),"
		+ "        s = d.getElementsByTagName('script')[0];"
		+ "    g.type = 'text/javascript';"
		+ "    g.defer = true;"
		+ "    g.async = true;"
		+ "    g.src = u + 'tracking/survey.js?campaign=";

	$scope.embedCodePart2 = "';"
		+ "    s.parentNode.insertBefore(g, s);"
		+ "})();"
		+ "</script>";

	$scope.updateEmbedCode = function(campaignId) {
		$scope.embedCode = $scope.embedCodePart1 + campaignId + $scope.embedCodePart2;
		$scope.surveyUrl = config.frontend + "/campaign/" + campaignId;
	}


	/* * * * * * * * * * * */
	/*  6) CONGRATULATION  */
	/* * * * * * * * * * * */



})