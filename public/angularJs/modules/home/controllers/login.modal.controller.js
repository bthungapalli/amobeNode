(function(){
	
	function loginModalController($scope, $uibModalInstance,$state,LOGIN_CONSTANTS,loginFactory,loginService,$loading){
		
		 $scope.ok = function (userDetails) {
			    $uibModalInstance.close(userDetails);
			  };

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.subcategories=[];
	     
	     $scope.initializeLoginDetails = function () {
	    	 $scope.loginDetails={
	 				"email":"",
	 				"firstName":"",
	 				"lastName":"",
	 				"password":"",
	 				"gender":"",
	 				"confirmPassword":"",
	 				"mobileNumber":"",
	 				"address":"",
	 				"city":"",
	 				"state":"",
	 				"role":"",
	 				"zipcode":"",
	 				"age":"",
	 				"height":"",
	 				"weight":"",
	 				"category":"Select Category",
	 				"subcategory":"Select SubCategory",
	 		};
	     };
	     
	     $scope.initializeLoginMessageDetails = function () {
	    	 $scope.loginMessageDetails={
	 				"successMessage":{
	 					
	 				},
	 				"errorMessage":{
	 					
	 				}
	 		};
	     };
	     
	     $scope.clearErrorMessage = function () {
	    	 $scope.loginMessageDetails.errorMessage={};
	     };
	     
	     
	     $scope.changeBodyTemplate = function (bodyTemplate) {
	    	 $scope.initializeLoginDetails();
	    	 $scope.initializeLoginMessageDetails();
	    	 $scope.bodyTemplate=bodyTemplate;
	     };
	     
	     $scope.changeBodyTemplate("partials/home/loginBody.html");
	     
	     $scope.getAllCategories=function(){
	    	 loginFactory.getAllCategories()
				.then(function (categories) {
					$scope.categories=categories;
	            })
	            .catch(function(error){
	            	$scope.loginMessageDetails.errorMessage.login="Invalid Credentials";
	            	$loading.finish('login');
	            });
	     };
	     
	     $scope.getAllCategories();
	     
	     $scope.submitLogin=function(){
	    	 $loading.start('login');
	    	 $scope.clearErrorMessage();
				loginFactory.submitLogin($scope.loginDetails)
				.then(function (userDetails) {
					if(userDetails._id==undefined){
						$scope.loginMessageDetails.errorMessage.login="Invalid Username or Password";
					}else{
						$scope.ok(userDetails);
					}
					$loading.finish('login');
	            })
	            .catch(function(error){
	            	$scope.loginMessageDetails.errorMessage.login="Invalid Credentials";
	            	$loading.finish('login');
	            });
		 };
		 
	     $scope.forgotPassword=function(){
	    	 $scope.clearErrorMessage();
	    	 $loading.start('login');
				loginFactory.forgotPassword($scope.loginDetails.email)
				.then(function (response) {
					if(response.emailSent){
						$scope.loginMessageDetails.successMessage.forgotPassword="Mail Sent";
					}else{
						$scope.loginMessageDetails.errorMessage.forgotPassword="Email doesn't exist please sign in";
					}
					$scope.initializeLoginDetails();
					$loading.finish('login');
	            })
	            .catch(function(error){
	            	$scope.loginMessageDetails.errorMessage.forgotPassword="Some thing went wrong";
	            	$loading.finish('login');
	            });;
		 };
		 
		 $scope.register=function(){
	    	 $scope.clearErrorMessage();
	    	  if($scope.loginDetails.password!==$scope.loginDetails.confirmPassword){
	    			$scope.loginMessageDetails.errorMessage.register="Password And Confirm Password Do Not Match.";
	    	 }else{
	    		 $loading.start('login');
					loginFactory.register($scope.loginDetails)
					.then(function (response) {
						$scope.loginMessageDetails.successMessage.login=response.success;
						$scope.initializeLoginDetails();
						$loading.finish('login');
		            })
		            .catch(function(error){
		            	$scope.loginMessageDetails.errorMessage.register=error;
		            	$loading.finish('login');
		            });
	    	 }
		 };
		 
		 $scope.getSubCategories=function(){
			 if($scope.loginDetails.subcategory=="Select SubCategory"){
				 $scope.subcategories=[];
				 $scope.subcategories=JSON.parse($scope.loginDetails.category).subcategories;
			 }
			 
		 };
		 
		 $scope.validateEmail=function(){
	    	 $scope.clearErrorMessage();
				loginFactory.validateEmail($scope.loginDetails.email)
				.then(function (response) {
					if(response.alreadyExist){
						$scope.loginMessageDetails.errorMessage.registerEmailAlreadyExist="Email already Exist";
					}else{
						$scope.clearErrorMessage();
					}
	            })
	            .catch(function(error){
	            	
	            });
		 };
		 
	};
	
	loginModalController.$inject=['$scope', '$uibModalInstance','$state','LOGIN_CONSTANTS','loginFactory','loginService','$loading'];
	
	angular.module('amoeba.home').controller("loginModalController",loginModalController);
	
})();