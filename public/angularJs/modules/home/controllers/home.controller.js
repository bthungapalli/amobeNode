(function(){
	
	function homeController($rootScope,$scope,$state,$uibModal,$loading,$location, $anchorScroll,LOGIN_CONSTANTS,$document){
		
		$scope.showLoginRegisterModal=function(){
			
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/home/loginModal.html',
			      controller: 'loginModalController',
			      size: LOGIN_CONSTANTS.LOGIN_MODAL_SIZE
			    });

			 modalInstance.result.then(function (userDetails) {
				 $rootScope.userDetails=userDetails;
				 $state.go(LOGIN_CONSTANTS.LOGIN_SUCCESS_ROUTE);
				 $loading.finish('login');
			   }, function () {
			     // cancel
			    });
		};
		
		
		
		$scope.navigateTo=function(id){
		      var someElement = angular.element(document.getElementById(id));
		      $document.scrollToElement(someElement, 0, 2000);
		};
	};
	
	homeController.$inject=['$rootScope','$scope','$state','$uibModal','$loading','$location','$anchorScroll','LOGIN_CONSTANTS','$document'];
	
	angular.module('amoeba.home').controller("homeController",homeController);
	
})();