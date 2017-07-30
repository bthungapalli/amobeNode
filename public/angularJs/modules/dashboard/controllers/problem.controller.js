(function(){
	
	function problemController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.editProblem=false;
		$scope.init=function(){
			$scope.problem={
					"title":"",
					"summary":"",
					"description":"",
					"status":"",
					"anonymous":false
			};
		}
		
		$scope.init();
		
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
		
		if($scope.problemId!=0){
			$scope.editProblem=true;
			$scope.getProblem();
		}
	     
		$scope.submitProblem=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.submitProblem($scope.problem).then(function (response) {
				$scope.init();
				$state.go("dashboard.problems");
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	problemController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','$stateParams'];
	
	angular.module('amoeba.dashboard').controller("problemController",problemController);
	
})();