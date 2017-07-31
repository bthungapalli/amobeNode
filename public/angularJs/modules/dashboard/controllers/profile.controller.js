(function(){
	
	function profileController($scope,profileFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,categoryFactory){
		
		$scope.editProfile=false;
		$scope.userDetails= angular.copy(dashboardUserDetailsService.userDetails);
		
		 $scope.loginDetails={
	 				"category":[],
	 				"subcategory":"Select SubCategory",
	 				"subcategoryList":[],
	 				"category1":"Select Category"
	 		};
		
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
		
		
		$scope.getSubCategories=function(){
			 if($scope.loginDetails.category1!=="Select Category"){
				 $scope.loginDetails.subcategories=[];
				 $scope.loginDetails.subcategories=JSON.parse($scope.loginDetails.category1).subcategories;
			 }else{
				 $scope.loginDetails.subcategories=[];
			 }
		 };
		 
		 $scope.editCategory=function(category){
			 var categories=angular.copy($scope.categories);
			 categories.forEach(function(cat){
				 if(cat._id==category._id){
					 $scope.editCategoryName=cat.categoryName;
					 $scope.loginDetails.category1=cat;
				     $scope.loginDetails.subcategoryList=category.subcategories;
				     $scope.loginDetails.subcategories=cat.subcategories;
				 }
			 });
		 };
		 
		 $scope.addCategory=function(){
			 if($scope.loginDetails.subcategoryList.length>0){
				 var category=  typeof $scope.loginDetails.category1 === 'string' ? JSON.parse($scope.loginDetails.category1): $scope.loginDetails.category1;
				 category.subcategories=$scope.loginDetails.subcategoryList;
				 var exist=false;
				 var index=0;
				 $scope.userDetails.category.forEach(function(cat,i){
					 if(cat._id==category._id){
						 exist=true;
						 index=i;
					 }
				 });
				 if(exist){
					 $scope.userDetails.category[index]=category;
				 }else{
					 $scope.userDetails.category.push(category);
				 }
				 $scope.editCategoryName="";
				 $scope.loginDetails.category1="Select Category";
			     $scope.loginDetails.subcategoryList=[];
			 }
		 };
	     
		$scope.updateProfile=function(){
			dashboardSpinnerService.startSpinner();
			profileFactory.updateProfile($scope.userDetails).then(function (response) {
				$scope.editProfile=!$scope.editProfile;
				$rootScope.$broadcast('profile-update', response);
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	profileController.$inject=['$scope','profileFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','categoryFactory'];
	
	angular.module('amoeba.dashboard').controller("profileController",profileController);
	
})();