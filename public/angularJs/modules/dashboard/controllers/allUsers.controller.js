(function(){
	
	function allUsersController($scope,allUsersFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state){
		
		$scope.users=[];
		$scope.itemsPerPage="5";
		$scope.getAllUsers=function(){
			dashboardSpinnerService.startSpinner();
			allUsersFactory.getAllUsers().then(function (response) {
				$scope.redirectToLoginIfSessionExpires(response);
				$scope.users=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.getAllUsers();
	     
		$scope.activateOrInactivateUser=function(user,value){
			dashboardSpinnerService.startSpinner();
			var newUser=angular.copy(user);
			newUser.isActive=value;
			allUsersFactory.activateOrDeactivateUsers(newUser).then(function (response) {
				$scope.redirectToLoginIfSessionExpires(response);
				user.isActive=value;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	allUsersController.$inject=['$scope','allUsersFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state'];
	
	angular.module('amoeba.dashboard').controller("allUsersController",allUsersController);
	
})();