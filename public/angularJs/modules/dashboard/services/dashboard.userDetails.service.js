(function(){
	
	function dashboardUserDetailsService($rootScope,$state,dashboardUserDetailsFactory,dashboardSpinnerService,$uibModal){
		
		this.userDetails={};
		
		this.setUserDetails=function(user){
			angular.extend(this.userDetails,user);
		};
		
		this.addRemoveClassToSideBar=function(){
			if(angular.element('#sideBar').hasClass("sidebar-collapse")){
				angular.element('#sideBar').removeClass("sidebar-collapse");
			}else{
				angular.element('#sideBar').addClass("sidebar-collapse");
			};
		};
		
		this.logout=function(){
			dashboardSpinnerService.startSpinner();
			dashboardUserDetailsFactory.logout().then(function(reponse){
				this.userDetails=undefined;
				dashboardSpinnerService.stopSpinner();;
				$state.go('login');
			}).catch(function(error){
				
			});
		};
		
	};
	
	dashboardUserDetailsService.$inject=['$rootScope','$state','dashboardUserDetailsFactory','dashboardSpinnerService','$uibModal'];
	
	angular.module('amoeba.dashboard').service('dashboardUserDetailsService',dashboardUserDetailsService);
	
})();



