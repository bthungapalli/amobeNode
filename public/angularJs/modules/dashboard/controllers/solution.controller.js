(function(){
	
	function solutionController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		
		$scope.solution={
				"description":"",
				"problemId":$scope.problemId
		}
		
		$scope.getProblem=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getProblem($scope.problemId).then(function (response) {
				$scope.problem=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.solutionObj=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getSolutionByProblemId($scope.problemId).then(function (response) {
				$scope.solution.description=response.description;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
        $scope.getProblem();
        
        $scope.solutionObj();
	     
		$scope.submitSolution=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.submitSolution($scope.solution).then(function (response) {
				$state.go("dashboard.problems");
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	solutionController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','$stateParams'];
	
	angular.module('amoeba.dashboard').controller("solutionController",solutionController);
	
})();