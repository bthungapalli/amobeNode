(function(){
	
	function categoryFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function getCategories(){
			var submitProblem=$resource("/categories/allCategories");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		function submitCategory(category){
			var submitProblem=$resource("/categories/createCategory");
			var defered=$q.defer();
			submitProblem.save(category,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			getCategories:getCategories,
			submitCategory:submitCategory
		};
	};
	
	categoryFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('categoryFactory',categoryFactory);
	
})();



