(function(){
	
	function problemsController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state){
		$scope.myProblems=false;
		$scope.allProblems=false;
		$scope.acceptedProblems=false;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.problems=[];
		$scope.solution={};
		$scope.itemsPerPage="5";
		$scope.title="";
		
		$scope.getProblems=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getProblems().then(function (response) {
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
		
		$scope.getMyProblems=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getMyProblems().then(function (response) {
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
		
		$scope.getAcceptedProblems=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getAcceptedProblems().then(function (response) {
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
		
		if($state.current.name==="dashboard.myProblems"){
			$scope.getMyProblems();
			$scope.myProblems=true;
			$scope.title="My";
		}else if($state.current.name==="dashboard.problems"){
			$scope.allProblems=true;
			$scope.getProblems();
			$scope.title="All";
		}else if($state.current.name==="dashboard.acceptedProblems"){
			$scope.acceptedProblems=true;
			$scope.getAcceptedProblems();
			$scope.title="Accepted";
		}
		
		$scope.editProblem=function(problem){
			$state.go('dashboard.problem', {"problemId": problem._id})
		};
		
		$scope.acceptProblem=function(problem,index){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.acceptProblem(problem).then(function (response) {
				$state.go("dashboard.acceptedProblems")
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		}
		
		
		$scope.solutionObj=function(problem){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getSolutionByProblemId(problem._id).then(function (response) {
				problem.solution=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.getComments=function(problem){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getComments(problem._id).then(function (response) {
				problem.comments=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		}
		
		$scope.addComment=function(problem){
			
			if(problem.comment!==undefined){
				$scope.errorMessage="";
				$scope.successMessage="";
				dashboardSpinnerService.startSpinner();
				problemsFactory.addComment(problem).then(function (response) {
					problem.comment="";
					problem.comments.push(response);
					dashboardSpinnerService.stopSpinner();
	            })
	            .catch(function(error){
	        		$scope.errorMessage="Some thing went wrong";
	            	dashboardSpinnerService.stopSpinner();
	            });
			}
			
		}
		
		$scope.submitSolution=function(problem){
			$state.go('dashboard.solution', {"problemId": problem._id})
		}
		
		
	};
	
	problemsController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state'];
	
	angular.module('amoeba.dashboard').controller("problemsController",problemsController);
	
})();