(function(){
	
	function profileController($scope,profileFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state){
		
		$scope.editProfile=false;
		$scope.userDetails= angular.copy(dashboardUserDetailsService.userDetails);
		
	     
		$scope.updateProfile=function(){
			dashboardSpinnerService.startSpinner();
			profileFactory.updateProfile($scope.userDetails).then(function (response) {
				$scope.editProfile=!$scope.editProfile;
				$rootScope.$broadcast('profile-update', response);
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	profileController.$inject=['$scope','profileFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state'];
	
	angular.module('amoeba.dashboard').controller("profileController",profileController);
	
})();