(function(){
	
	function solutionController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		
		$scope.tinymceOptions = {
			    inline: false,
			    plugins: [
		                    'advlist autolink lists link image charmap print preview anchor',
		                    'searchreplace visualblocks code fullscreen',
		                    'insertdatetime media table contextmenu paste code'
		                ],
		        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			    skin: 'lightgray',
			    theme : 'modern'
			  };
		
		
		$scope.solution={
				"description":"",
				"problemId":$scope.problemId,
				"problemTitle":"",
				"problemCreatedBy":"",
		}
		
		$scope.getProblem=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getProblem($scope.problemId).then(function (response) {
				$scope.problem=response;
				$scope.solution.problemTitle=response.title;
				$scope.solution.problemCreatedBy=response.created_by;
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