(function(){
	
	function dashboardUserDetailsFactory($resource,$q,DASHBOARD_CONSTANTS,$http){
		
		var logout=function(){
			var logoutResource=$resource(DASHBOARD_CONSTANTS.LOGOUT_URL);
			var defered=$q.defer();
			logoutResource.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		var checkSessionExist=function(){
			var defered=$q.defer();
			    $http.get("/checkUser")
                .success(function (userDetails){
                	defered.resolve(userDetails);
                })
                .catch(function(error){
                	defered.reject(error);
                });
			return defered.promise;
		}
		
		return {
			"logout":logout,
			"checkSessionExist":checkSessionExist
		}
		
	};
	
	dashboardUserDetailsFactory.$inject=['$resource','$q','DASHBOARD_CONSTANTS','$http'];
	
	angular.module('amoeba.dashboard').service('dashboardUserDetailsFactory',dashboardUserDetailsFactory);
	
})();



