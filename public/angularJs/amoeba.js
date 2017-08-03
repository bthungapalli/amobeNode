(function(){
	
	var appModule=angular.module('amoeba',['ui.bootstrap','angularUtils.directives.dirPagination','ngRoute','ui.router','darthwade.dwLoading','duScroll','ui.tinymce','amoeba.home','amoeba.dashboard']);

	angular.element(document).ready(function() {
	    angular.bootstrap(document, ['amoeba']);
	 });
	
	
	appModule.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider){
		
		$httpProvider.interceptors.push([function(){
		    return {
		        request: function(config){
		            if(config.url.indexOf('partials/') > -1 || config.url.indexOf('dist/amoeba.js') > -1){
		                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
		                config.url = config.url + separator + 'c='+12346;
		            }

		            return config;
		        }
		    };
		}]);
		
		  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		  
		    $stateProvider.state('login', {
		            url: '/',
		            templateUrl: 'partials/home/home.html',
		            controller:'homeController'
		        }).state('dashboard', {
		            url: '/dashboard',
		            templateUrl: 'partials/dashboard/dashboard.html',
		            controller:'dashboardController'
		        }).state('dashboard.profile', {
		            url: '/profile',
		            templateUrl: 'partials/dashboard/profile.html',
		            controller:'profileController'
		        }).state('dashboard.allUsers', {
		            url: '/users',
		            templateUrl: 'partials/dashboard/allUsers.html',
		            controller:'allUsersController'
		        }).state('dashboard.problem', {
		            url: '/problem/:problemId',
		            templateUrl: 'partials/dashboard/problem.html',
		            controller:'problemController'
		        }).state('dashboard.problems', {
		            url: '/problems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.myProblems', {
		            url: '/myproblems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.acceptedProblems', {
		            url: '/acceptedproblems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.categories', {
		            url: '/categories',
		            templateUrl: 'partials/dashboard/categories.html',
		            controller:'categoriesController'
		        }).state('dashboard.solution', {
		            url: '/solution/:problemId',
		            templateUrl: 'partials/dashboard/solution.html',
		            controller:'solutionController'
		        }).state('dashboard.reRouteProblems', {
		            url: '/rerouteproblems',
		            templateUrl: 'partials/dashboard/reRouteProblems.html',
		            controller:'reRouteProblemsController'
		        }).state('registrationConfirmation', {
		            url: '/registrationConfirmation',
		            controller:'registrationConfirmationController'
		        });
		    $locationProvider.html5Mode(true);
		    $urlRouterProvider.otherwise('/');
	});
	
	appModule.run(function($state){
		$state.go("login");
	});
	
	
})();