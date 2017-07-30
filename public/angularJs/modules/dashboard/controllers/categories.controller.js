(function(){
	
	function categoriesController($scope,categoryFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.categories=[];
		$scope.itemsPerPage="5";
		$scope.category={
				"categoryName":"",
				subcategories:[]
				
		}
		
		$scope.subcategory={
				"subcategoryName":"",
		}
		
		$scope.getCategories=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			categoryFactory.getCategories().then(function (response) {
				$scope.categories=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		
        
        $scope.getCategories();
        
        
        $scope.addSubcategory=function(){
        	if($scope.subcategory.subcategoryName!=""){
        		$scope.category.subcategories.push($scope.subcategory.subcategoryName);
        		$scope.subcategory.subcategoryName="";
        	}
        }
        
        $scope.removeSubcategory=function(index){
        		$scope.category.subcategories.splice(index,1);
        }
	     
		$scope.submitCategory=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			categoryFactory.submitCategory($scope.category).then(function (response) {
				$scope.categories.push(response);
				$scope.category={
						"categoryName":"",
						subcategories:[]
						
				}
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	categoriesController.$inject=['$scope','categoryFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','$stateParams'];
	
	angular.module('amoeba.dashboard').controller("categoriesController",categoriesController);
	
})();