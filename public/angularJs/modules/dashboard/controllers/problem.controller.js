(function(){
	
	function problemController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,$stateParams,categoryFactory){
		$scope.problemId=$stateParams.problemId;
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.editProblem=false;
		$scope.categories=[];
		
		$scope.tinymceOptions = {
			    inline: false,
			    plugins: [
		                    'advlist autolink lists link image charmap print preview anchor',
		                    'searchreplace visualblocks code',
		                    'insertdatetime media table contextmenu paste code'
		                ],
		        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			    skin: 'lightgray',
			    theme : 'modern'
			  };
		
		$scope.init=function(){
			$scope.problem={
					"title":"",
					"summary":"",
					"description":"",
					"status":"",
					"anonymous":false,
					"category":"",
					"subcategory":"Select Subcategory",
					"tempCategory":"Select Category"
					
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
			 if($scope.problem.tempCategory!=="Select Category"){
				 $scope.subcategories=[];
				 $scope.subcategories=JSON.parse($scope.problem.tempCategory).subcategories;
				 $scope.problem.category=JSON.parse($scope.problem.tempCategory).categoryName;
			 }else{
				 $scope.subcategories=[];
				 $scope.problem.category="";
				 $scope.problem.subcategory="Select Subcategory";
			 }
		 };
		 
		 
		 $scope.deleteFile=function(index){
			 $scope.problem.filePath.splice(index,1);
		 }
		
		$scope.submitProblem=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			
			problemsFactory.submitProblem($scope.problem).then(function (response) {
				
				if($scope.problem.file){
					var problem=response;
					$scope.index=0;
					for(var i=0; i<$scope.problem.file.length;i++){
						problemsFactory.fileUpload($scope.problem.file[i]).then(function (response) {
							problem.filePath.push(response.filename);
							$scope.index=$scope.index+1;
							 if($scope.problem.file.length==$scope.index){
								 
								 problemsFactory.submitProblem(problem).then(function (response) {
									  $scope.init();
										$state.go("dashboard.myProblems");
										dashboardSpinnerService.stopSpinner();
						            })
						            .catch(function(error){
						        		$scope.errorMessage="Some thing went wrong";
						            	dashboardSpinnerService.stopSpinner();
						            });
							  }
						}).catch(function(error){
			        		$scope.errorMessage="Some thing went wrong";
			            	dashboardSpinnerService.stopSpinner();
			            });
					}	
				}else{
					$scope.init();
					$state.go("dashboard.myProblems");
					dashboardSpinnerService.stopSpinner();
				}
				
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