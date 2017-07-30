(function(){
	
	function loginService(){
		
		var userTypeDetails;
		
		this.setUserTypeDetails=function(userTypeDetails){
			this.userTypeDetails=userTypeDetails;
		}
	};
	
	loginService.$inject=[];
	
	angular.module('amoeba.home').service('loginService',loginService);
	
})();



