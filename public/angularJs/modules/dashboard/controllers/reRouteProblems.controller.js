(function(){
	
	function reRouteProblemsController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,allUsersFactory){
		
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.problems=[];
		$scope.itemsPerPage="5";
		$scope.newConsultant="Select Consultant";
		$scope.getBlockedAcceptedProblems=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getBlockedAcceptedProblems().then(function (response) {
				$scope.problems=response;
				if(response.length==0){
					$scope.successMessage="No Problems Available";
				}
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.getBlockedAcceptedProblems();
		
		$scope.getUsersForProblem=function(problem){
			$scope.newConsultant="Select Consultant";
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			allUsersFactory.getUsersForProblem(problem.category,problem.subcategory,problem.accepted_by).then(function (response) {
				$scope.users=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.saveNewConsultant=function(problem){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.saveNewConsultant($scope.newConsultant,problem._id).then(function (response) {
				$scope.newConsultant="Select Consultant";
				$scope.getBlockedAcceptedProblems();
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		}
		
	};
	
	reRouteProblemsController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','allUsersFactory'];
	
	angular.module('amoeba.dashboard').controller("reRouteProblemsController",reRouteProblemsController);
	
})();