(function(){
	
	function dashboardSpinnerService($loading){
		
		this.startSpinner=function(){
			$loading.start('home');
		}
		
		this.stopSpinner=function(){
			$loading.finish('home');
		}
		
	};
	
	dashboardSpinnerService.$inject=['$loading'];
	
	angular.module('amoeba.dashboard').service('dashboardSpinnerService',dashboardSpinnerService);
	
})();



