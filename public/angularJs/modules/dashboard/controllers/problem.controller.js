(function(){
	
	function problemController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams,categoryFactory){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.editProblem=false;
		$scope.category="Select Category";
		$scope.categories=[];
		$scope.init=function(){
			$scope.problem={
					"title":"",
					"summary":"",
					"description":"",
					"status":"",
					"anonymous":false,
					"category":"",
					"subcategory":"Select Subcategory"
					
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
		
		$scope.getAllCategories=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			categoryFactory.getAllCategories().then(function (response) {
				$scope.categories=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
	     
		$scope.getAllCategories();
		
		
		$scope.subCategories=function(){
			 if($scope.category!=="Select Category"){
				 $scope.subcategories=[];
				 $scope.subcategories=JSON.parse($scope.category).subcategories;
				 $scope.problem.category=JSON.parse($scope.category).categoryName;
			 }else{
				 $scope.subcategories=[];
				 $scope.problem.category="";
				 $scope.problem.subcategory="Select Subcategory";
			 }
		 };
		
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
	
	problemController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','$stateParams','categoryFactory'];
	
	angular.module('amoeba.dashboard').controller("problemController",problemController);
	
})();