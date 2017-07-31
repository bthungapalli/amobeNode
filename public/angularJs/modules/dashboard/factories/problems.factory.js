(function(){
	
	function problemsFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function submitProblem(problem){
			var submitProblem=$resource("/problems/createProblem");
			var defered=$q.defer();
			submitProblem.save(problem,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getProblems(){
			var submitProblem=$resource("/problems/allProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getMyProblems(){
			var submitProblem=$resource("/problems/myProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getProblem(problemId){
			var submitProblem=$resource("/problems/problem/"+problemId);
			var defered=$q.defer();
			submitProblem.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function acceptProblem(problem){
			var submitProblem=$resource("/problems/acceptProblem");
			var defered=$q.defer();
			submitProblem.save(problem,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		

		function getAcceptedProblems(){
			var submitProblem=$resource("/problems/acceptedProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function submitSolution(solution){
			var submitProblem=$resource("/problems/solution");
			var defered=$q.defer();
			submitProblem.save(solution,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getSolutionByProblemId(problemId){
			var submitProblem=$resource("/problems/solution/"+problemId);
			var defered=$q.defer();
			submitProblem.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getBlockedAcceptedProblems(){
			var submitProblem=$resource("/problems/blockedAcceptedProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		
		function saveNewConsultant(name,id){
			var payload =  {"email":name,"problemId":id};
			var submitProblem=$resource("/problems/newConsultant");
			var defered=$q.defer();
			submitProblem.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			submitProblem:submitProblem,
			getProblems:getProblems,
			getMyProblems:getMyProblems,
			getProblem:getProblem,
			acceptProblem:acceptProblem,
			getAcceptedProblems:getAcceptedProblems,
			submitSolution:submitSolution,
			getSolutionByProblemId:getSolutionByProblemId,
			getBlockedAcceptedProblems:getBlockedAcceptedProblems,
			saveNewConsultant:saveNewConsultant
		};
	};
	
	problemsFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('problemsFactory',problemsFactory);
	
})();



