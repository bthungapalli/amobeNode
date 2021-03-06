(function(){
	
	function dashboardController($scope,$rootScope,$state,dashboardUserDetailsService){
		if($rootScope.userDetails!==undefined && $rootScope.userDetails._id!=0){

			$scope.userDetails=angular.copy($rootScope.userDetails);
			dashboardUserDetailsService.setUserDetails($rootScope.userDetails);
			$scope.addRemoveClassToSideBar=dashboardUserDetailsService.addRemoveClassToSideBar;
			$scope.currentView="profile";
			$state.go('dashboard.profile');
			
		}else{
			$state.go('login');
		}
		
		$scope.logout=function(){
			$rootScope.registrationConfirmationMessageFailure="";
			$rootScope.registrationConfirmationMessageSuccess="";
			dashboardUserDetailsService.logout();
		};
		
		
		$scope.openDashBoard=function(){
			$state.go("home.dashboard");
		};
		
		$scope.$on('profile-update', function(event, args) {
			$rootScope.userDetails=args;
			angular.extend($scope.userDetails,args);
			dashboardUserDetailsService.setUserDetails(args);
		});
		
		$scope.setSideBarActive=function(view,state){
			$scope.currentView=view;
			if(state==="dashboard.problem"){
				$state.go('dashboard.problem', {"problemId": 0})	
			}else{
				$state.go(state);
			}
		};
		
		$scope.redirectToLoginIfSessionExpires=function(res){
			if(res.sessionExpired){
				$state.go("login");
			};
		};
	};
	
	
	dashboardController.$inject=['$scope','$rootScope','$state','dashboardUserDetailsService'];
	
	angular.module('amoeba.home').controller("dashboardController",dashboardController);
	
})();