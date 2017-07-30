(function(){
	
	function allUsersFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function activateOrDeactivateUsers(user){
			var updatePasswordResource=$resource("/userManagement/activeOrInActivateUser");
			var defered=$q.defer();
			updatePasswordResource.save(user,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getAllUsers(){
			var updatePasswordResource=$resource("/userManagement/allUsers");
			var defered=$q.defer();
			updatePasswordResource.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			activateOrDeactivateUsers:activateOrDeactivateUsers,
			getAllUsers:getAllUsers
		};
	};
	
	allUsersFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('allUsersFactory',allUsersFactory);
	
})();



