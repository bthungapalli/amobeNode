(function(){
	
	function categoriesController($scope,categoryFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.categories=[];
		$scope.itemsPerPage="5";
		$scope.editCategoryFlag=false;
		$scope.editCategoryIndex=0;
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
				$scope.redirectToLoginIfSessionExpires(response);
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
	    
        $scope.editCategory=function(category,index){
        	$scope.editCategoryFlag=true;
        	$scope.editCategoryIndex=index;
        	$scope.category=category;
        }
        
		$scope.submitCategory=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			categoryFactory.submitCategory($scope.category).then(function (response) {
				$scope.redirectToLoginIfSessionExpires(response);
				if($scope.editCategoryFlag){
					$scope.categories[$scope.editCategoryIndex]=response;
					$scope.editCategoryIndex=0;
					$scope.editCategoryFlag=false;
				}else{
					$scope.categories.push(response);
				}
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