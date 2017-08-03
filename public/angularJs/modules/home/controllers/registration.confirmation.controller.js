(function(){
	
	function registrationConfirmationController($rootScope,$state,loginFactory,$loading,$location){
		        $loading.start('login');
				loginFactory.confirmRegistration($location.search().token)
				.then(function (response) {
					$rootScope.registrationConfirmationMessageSuccess=response.message;
					$state.go("login");
					$loading.finish('login');
	            })
	            .catch(function(error){
	            	$rootScope.registrationConfirmationMessageFailure="Something went wrong";
	            	 $loading.finish('login');
	            	 $state.go("login");
	            });
		 
		 
	};
	
	registrationConfirmationController.$inject=['$rootScope','$state','loginFactory','$loading','$location'];
	
	angular.module('amoeba.home').controller("registrationConfirmationController",registrationConfirmationController);
	
})();