(function(){
	
	var appModule=angular.module('amoeba',['ui.bootstrap','angularUtils.directives.dirPagination','ngRoute','ui.router','darthwade.dwLoading','duScroll','ui.tinymce','amoeba.home','amoeba.dashboard']);

	angular.element(document).ready(function() {
	    angular.bootstrap(document, ['amoeba']);
	 });
	
	
	appModule.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider){
		
		$httpProvider.interceptors.push([function(){
		    return {
		        request: function(config){
		            if(config.url.indexOf('partials/') > -1 || config.url.indexOf('dist/amoeba.js') > -1){
		                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
		                config.url = config.url + separator + 'c='+12346;
		            }

		            return config;
		        }
		    };
		}]);
		
		  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		  
		    $stateProvider.state('login', {
		            url: '/',
		            templateUrl: 'partials/home/home.html',
		            controller:'homeController'
		        }).state('dashboard', {
		            url: '/dashboard',
		            templateUrl: 'partials/dashboard/dashboard.html',
		            controller:'dashboardController'
		        }).state('dashboard.profile', {
		            url: '/profile',
		            templateUrl: 'partials/dashboard/profile.html',
		            controller:'profileController'
		        }).state('dashboard.allUsers', {
		            url: '/users',
		            templateUrl: 'partials/dashboard/allUsers.html',
		            controller:'allUsersController'
		        }).state('dashboard.problem', {
		            url: '/problem/:problemId',
		            templateUrl: 'partials/dashboard/problem.html',
		            controller:'problemController'
		        }).state('dashboard.problems', {
		            url: '/problems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.myProblems', {
		            url: '/myproblems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.acceptedProblems', {
		            url: '/acceptedproblems',
		            templateUrl: 'partials/dashboard/problems.html',
		            controller:'problemsController'
		        }).state('dashboard.categories', {
		            url: '/categories',
		            templateUrl: 'partials/dashboard/categories.html',
		            controller:'categoriesController'
		        }).state('dashboard.solution', {
		            url: '/solution/:problemId',
		            templateUrl: 'partials/dashboard/solution.html',
		            controller:'solutionController'
		        }).state('dashboard.reRouteProblems', {
		            url: '/rerouteproblems',
		            templateUrl: 'partials/dashboard/reRouteProblems.html',
		            controller:'reRouteProblemsController'
		        }).state('registrationConfirmation', {
		            url: '/registrationConfirmation',
		            controller:'registrationConfirmationController'
		        });
		    $locationProvider.html5Mode(true);
		    $urlRouterProvider.otherwise('/');
	});
	
	appModule.run(function($state){
		$state.go("login");
	});
	
	
})();

(function(){
	
	angular.module('amoeba.dashboard',['ui.bootstrap']);
})();

(function(){
	
	angular.module('amoeba.home',['ngResource','ui.bootstrap']);
})();

(function(){
	
	angular.module('amoeba.home').constant("LOGIN_CONSTANTS",{
		"FORGOT_PASSWORD_URL":"/forgotPassword/",
		"LOGIN_STATE":"login",
		"LOGIN_MODAL_ANIMATE":"true",
		"LOGIN_MODAL_SIZE":"lg",
		"LOGIN_SUCCESS_ROUTE":"dashboard",
		"LOGIN_URL":"/login",
		"REGISTER_URL":"/registration",
		"VALIDATE_EMAIL_URL":"/registration/emailValidation/",
		"CONFIRM_REGISTRATION_URL":"/registration/registrationConfirmation?token="
			
	});
	
})();

(function(){
	
	function homeController($rootScope,$scope,$state,$uibModal,$loading,$location, $anchorScroll,LOGIN_CONSTANTS){
		
		$scope.showLoginRegisterModal=function(){
			
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/home/loginModal.html',
			      controller: 'loginModalController',
			      size: LOGIN_CONSTANTS.LOGIN_MODAL_SIZE
			    });

			 modalInstance.result.then(function (userDetails) {
				 $rootScope.userDetails=userDetails;
				 $state.go(LOGIN_CONSTANTS.LOGIN_SUCCESS_ROUTE);
				 $loading.finish('login');
			   }, function () {
			     // cancel
			    });
		};
		
		
		$scope.navigateTo=function(id){
		      var someElement = angular.element(document.getElementById(id));
		      $document.scrollToElement(someElement, 110, 2000);
		};
	};
	
	homeController.$inject=['$rootScope','$scope','$state','$uibModal','$loading','$location','$anchorScroll','LOGIN_CONSTANTS'];
	
	angular.module('amoeba.home').controller("homeController",homeController);
	
})();

(function(){
	
	function loginModalController($scope, $uibModalInstance,$state,LOGIN_CONSTANTS,loginFactory,loginService,$loading){
		
		$rootScope.registrationConfirmationMessageSuccess="";
		
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
	 				"cases":"",
	 				"category":[],
	 				"subcategory":"Select SubCategory",
	 				"subcategoryList":[],
	 				"category1":"Select Category"
	 				
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
						if(!userDetails.registrationConfirmed){
							$scope.loginMessageDetails.errorMessage.login="Account is not verified,Please click on the activation link sent ";
						}else if(!userDetails.isActive){
							$scope.loginMessageDetails.errorMessage.login="Admin disabled your account";
						}else{
							$scope.ok(userDetails);
						}
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
						$scope.loginMessageDetails.successMessage.register="Successfully Registered, Activation Link Mailed";
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
			 if($scope.loginDetails.category1!=="Select Category"){
				 $scope.loginDetails.subcategories=[];
				 $scope.loginDetails.subcategories=JSON.parse($scope.loginDetails.category1).subcategories;
			 }else{
				 $scope.loginDetails.subcategories=[];
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
		 
		 $scope.addCategory=function(){
			 if($scope.loginDetails.subcategoryList.length>0){
				 var category=JSON.parse($scope.loginDetails.category1);
				 category.subcategories=$scope.loginDetails.subcategoryList;
				 
				 var exist=false;
				 var index=0;
				 $scope.loginDetails.category.forEach(function(cat,i){
					 if(cat._id==category._id){
						 exist=true;
						 index=i;
					 }
				 });
				 if(exist){
					 $scope.loginDetails.category[index]=category;
				 }else{
					 $scope.loginDetails.category.push(category);
				 }
				 
				 $scope.loginDetails.category1="Select Category";
			     $scope.loginDetails.subcategoryList=[];
			 }
		 };
		 
	};
	
	loginModalController.$inject=['$scope', '$uibModalInstance','$state','LOGIN_CONSTANTS','loginFactory','loginService','$loading'];
	
	angular.module('amoeba.home').controller("loginModalController",loginModalController);
	
})();

(function(){
	
	function registrationConfirmationController($rootScope,$state,loginFactory,$loading,$location){
		        $loading.start('login');
				loginFactory.confirmRegistration($location.search().token)
				.then(function (response) {
					$rootScope.registrationConfirmationMessageSuccess=response.message;
					$state.go("login");
					$loading.finish('login');
	            })
	            .catch(function(error){
	            	$rootScope.registrationConfirmationMessageFailure="Something went wrong";
	            	 $loading.finish('login');
	            	 $state.go("login");
	            });
		 
		 
	};
	
	registrationConfirmationController.$inject=['$rootScope','$state','loginFactory','$loading','$location'];
	
	angular.module('amoeba.home').controller("registrationConfirmationController",registrationConfirmationController);
	
})();

(function(){
	
	function location(){
		
		location={
				restrict:'E',
				template:' <input id="register_password" class="form-control" type="text" placeholder="Zip Code" ng-model="loginDetails.zipcode" required>',
				replace:true,
				compile: function(element, attributes){  
				     return {
				             pre: function(scope, element, attributes){

				             },
				             post: function(scope, element, attributes){
				            	
				            	 element.bind('blur',function(){
				            		 geocoder = new google.maps.Geocoder();
				                     var zipcode = scope.$parent.loginDetails.zipcode;
				                     geocoder.geocode({ 'address': zipcode }, function (results, status) {
				                         if (status == google.maps.GeocoderStatus.OK && results[0].address_components.length>=4) {             
				                        	 scope.$parent.clearErrorMessage();
				                        	var locationDetails= results[0].address_components; 
				                        	var location={
				                        			"zipcode":locationDetails[0].long_name,
				                        			"city":locationDetails[1].long_name,
				                        			"state":locationDetails[2].long_name,
				                        			"country":locationDetails[3].long_name,
				                        	};
				                            angular.extend(scope.$parent.loginDetails,location);  
				                         } else {
				                        	 scope.$parent.loginMessageDetails.errorMessage={"zipcode":"Invalid Zipcode"};
				                         }
				                     });
				            		
				            	 });
				             }
				         }
				     }
		}
		
		return location;
	};
	
	location.$inject=[];
	
	angular.module('amoeba.home').directive('location',location);
	
})();





(function(){
	
	function loginFactory($q,LOGIN_CONSTANTS,$resource){
		
		
		function submitLogin(loginDetails){
			var registerResource=$resource(LOGIN_CONSTANTS.LOGIN_URL);
			var defered=$q.defer();
			var payload =  {"email":loginDetails.email,"password":loginDetails.password};
			registerResource.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function forgotPassword(email){
			var forgotPasswordResource=$resource(LOGIN_CONSTANTS.FORGOT_PASSWORD_URL+email);
			var defered=$q.defer();
			forgotPasswordResource.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function register(loginDetails){
			var registerResource=$resource(LOGIN_CONSTANTS.REGISTER_URL);
			var defered=$q.defer();
			var payload =  {"email":loginDetails.email,"password":loginDetails.password,"city":loginDetails.city,"state":loginDetails.state,
							"country":loginDetails.country,"zipcode":loginDetails.zipcode,"firstName":loginDetails.firstName,"lastName":loginDetails.lastName,
							"gender":loginDetails.gender,"mobileNumber":loginDetails.mobileNumber,"address":loginDetails.address,"role":loginDetails.role,"cases":loginDetails.cases
							,"zipcode":loginDetails.zipcode,"age":loginDetails.age,"height":loginDetails.height,"weight":loginDetails.weight,"category":loginDetails.category}
			registerResource.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function validateEmail(emailId){
			var registerResource=$resource(LOGIN_CONSTANTS.VALIDATE_EMAIL_URL+emailId);
			var defered=$q.defer();
			registerResource.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function confirmRegistration(token){
			var confirmRegistrationResource=$resource(LOGIN_CONSTANTS.CONFIRM_REGISTRATION_URL+token);
			var defered=$q.defer();
			confirmRegistrationResource.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getAllCategories(){
			var registerResource=$resource("/categories/allCategories");
			var defered=$q.defer();
			registerResource.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			submitLogin:submitLogin,
			forgotPassword:forgotPassword,
			register:register,
			validateEmail:validateEmail,
			confirmRegistration:confirmRegistration,
			getAllCategories:getAllCategories
		};
	};
	
	loginFactory.$inject=['$q','LOGIN_CONSTANTS','$resource'];
	
	angular.module('amoeba.home').factory('loginFactory',loginFactory);
	
})();





(function(){
	
	function loginService(){
		
		var userTypeDetails;
		
		this.setUserTypeDetails=function(userTypeDetails){
			this.userTypeDetails=userTypeDetails;
		}
	};
	
	loginService.$inject=[];
	
	angular.module('amoeba.home').service('loginService',loginService);
	
})();





(function(){
	
	angular.module('amoeba.dashboard').constant("DASHBOARD_CONSTANTS",{
		"LOGOUT_URL":"/logout",
		"PROFILE_UPDATE_URL":"/profile",
	});
	
})();

(function(){
	
	function allUsersController($scope,allUsersFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state){
		
		$scope.users=[];
		$scope.itemsPerPage="5";
		$scope.getAllUsers=function(){
			dashboardSpinnerService.startSpinner();
			allUsersFactory.getAllUsers().then(function (response) {
				$scope.users=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.getAllUsers();
	     
		$scope.activateOrInactivateUser=function(user,value){
			dashboardSpinnerService.startSpinner();
			var newUser=angular.copy(user);
			newUser.isActive=value;
			allUsersFactory.activateOrDeactivateUsers(newUser).then(function (response) {
				user.isActive=value;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	allUsersController.$inject=['$scope','allUsersFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state'];
	
	angular.module('amoeba.dashboard').controller("allUsersController",allUsersController);
	
})();

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

(function(){
	
	function dashboardController($scope,$rootScope,$state,dashboardUserDetailsService){
		if($rootScope.userDetails!==undefined && $rootScope.userDetails._id!=0){

			$scope.userDetails=angular.copy($rootScope.userDetails);
			dashboardUserDetailsService.setUserDetails($rootScope.userDetails);
			$scope.addRemoveClassToSideBar=dashboardUserDetailsService.addRemoveClassToSideBar;
			$scope.currentView="profile";
			$state.go('dashboard.profile');
			
		}else{
			$state.go('login');
		}
		
		$scope.logout=function(){
			$rootScope.registrationConfirmationMessageFailure="";
			$rootScope.registrationConfirmationMessageSuccess="";
			dashboardUserDetailsService.logout();
		};
		
		
		$scope.openDashBoard=function(){
			$state.go("home.dashboard");
		};
		
		$scope.$on('profile-update', function(event, args) {
			$rootScope.userDetails=args;
			angular.extend($scope.userDetails,args);
			dashboardUserDetailsService.setUserDetails(args);
		});
		
		$scope.setSideBarActive=function(view,state){
			$scope.currentView=view;
			if(state==="dashboard.problem"){
				$state.go('dashboard.problem', {"problemId": 0})	
			}else{
				$state.go(state);
			}
		};
	};
	
	
	dashboardController.$inject=['$scope','$rootScope','$state','dashboardUserDetailsService'];
	
	angular.module('amoeba.home').controller("dashboardController",dashboardController);
	
})();

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
			if(problem.status=='SAVE'){
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
			}
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
			
			if($scope.userDetails.uploadImage){
				$scope.userDetails.uploadImage=$scope.userDetails.uploadImage[0];
			}
			profileFactory.updateProfile($scope.userDetails).then(function (response) {
				
				if($scope.userDetails.uploadImage){
					
					profileFactory.uploadFile($scope.userDetails).then(function (response) {
						$scope.editProfile=!$scope.editProfile;
						$scope.userDetails.userImagePath=response.path;
						$rootScope.$broadcast('profile-update', $scope.userDetails);
						dashboardSpinnerService.stopSpinner();
					}).catch(function(error){
		            	dashboardSpinnerService.stopSpinner();
		            });
					
				}else{
					$scope.editProfile=!$scope.editProfile;
					$rootScope.$broadcast('profile-update', $scope.userDetails);
					dashboardSpinnerService.stopSpinner();
				}
				
            }).catch(function(error){
            	dashboardSpinnerService.stopSpinner();
            });
		};
	};
	
	profileController.$inject=['$scope','profileFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','categoryFactory'];
	
	angular.module('amoeba.dashboard').controller("profileController",profileController);
	
})();

(function(){
	
	function reRouteProblemsController($scope,problemsFactory,dashboardUserDetailsService,$rootScope,dashboardSpinnerService,$state,allUsersFactory){
		
		$scope.errorMessage="";
		$scope.successMessage="";
		$scope.problems=[];
		$scope.itemsPerPage="5";
		$scope.newConsultant="Select Consultant";
		$scope.getBlockedAcceptedProblems=function(){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.getBlockedAcceptedProblems().then(function (response) {
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
		
		$scope.getBlockedAcceptedProblems();
		
		$scope.getUsersForProblem=function(problem){
			$scope.newConsultant="Select Consultant";
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			allUsersFactory.getUsersForProblem(problem.category,problem.subcategory,problem.accepted_by).then(function (response) {
				$scope.users=response;
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		};
		
		$scope.saveNewConsultant=function(problem){
			$scope.errorMessage="";
			$scope.successMessage="";
			dashboardSpinnerService.startSpinner();
			problemsFactory.saveNewConsultant($scope.newConsultant,problem._id).then(function (response) {
				$scope.newConsultant="Select Consultant";
				$scope.getBlockedAcceptedProblems();
				dashboardSpinnerService.stopSpinner();
            })
            .catch(function(error){
        		$scope.errorMessage="Some thing went wrong";
            	dashboardSpinnerService.stopSpinner();
            });
		}
		
	};
	
	reRouteProblemsController.$inject=['$scope','problemsFactory','dashboardUserDetailsService','$rootScope','dashboardSpinnerService','$state','allUsersFactory'];
	
	angular.module('amoeba.dashboard').controller("reRouteProblemsController",reRouteProblemsController);
	
})();

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

(function(){
	angular.module("amoeba.dashboard").directive('amoebaFooter',function(){
		
		var amoebaFooter={
				restrict:'E',
				templateUrl:'partials/dashboard/footer.html'
			};
		
		return amoebaFooter;
		
	});
})();



(function(){
	angular.module("amoeba.dashboard").directive('amoebaHeader', function(){
		
		var amoebaHeader={
				restrict:'E',
				templateUrl:'partials/dashboard/header.html'
			};
		
		return amoebaHeader;
	});
})();



(function(){
	angular.module("amoeba.dashboard").directive('amoebaSidebar',function(){
		
		var amoebaSidebar={
				restrict:'E',
				templateUrl:'partials/dashboard/sidebar.html'
			};
		
		return amoebaSidebar;
	});
})();



angular.module("amoeba.dashboard").directive('fileModel', ['$parse', function ($parse) {
		return {
		    restrict: 'A',
		    link: function(scope, element, attrs) {
		        var model = $parse(attrs.fileModel);
		        var modelSetter = model.assign;

		        element.bind('change', function(){
		            scope.$apply(function(){
		                modelSetter(scope, element[0].files);
		            });
		        });
		    }
		};
}]);


(function(){
	
	function allUsersFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function activateOrDeactivateUsers(user){
			var updatePasswordResource=$resource("/userManagement/activeOrInActivateUser");
			var defered=$q.defer();
			updatePasswordResource.save(user,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getAllUsers(){
			var updatePasswordResource=$resource("/userManagement/allUsers");
			var defered=$q.defer();
			updatePasswordResource.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getUsersForProblem(category,subcategory,name){
			var updatePasswordResource=$resource("/userManagement/usersForProblem/"+category+"/"+subcategory+"/"+name);
			var defered=$q.defer();
			updatePasswordResource.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		
		return {
			activateOrDeactivateUsers:activateOrDeactivateUsers,
			getAllUsers:getAllUsers,
			getUsersForProblem:getUsersForProblem
		};
	};
	
	allUsersFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('allUsersFactory',allUsersFactory);
	
})();





(function(){
	
	function categoryFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function getCategories(){
			var submitProblem=$resource("/categories/allCategories");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		function submitCategory(category){
			var submitProblem=$resource("/categories/createCategory");
			var defered=$q.defer();
			submitProblem.save(category,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getAllCategories(){
			var registerResource=$resource("/categories/allCategories");
			var defered=$q.defer();
			registerResource.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			getCategories:getCategories,
			submitCategory:submitCategory,
			getAllCategories:getAllCategories
		};
	};
	
	categoryFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('categoryFactory',categoryFactory);
	
})();





(function(){
	
	function dashboardUserDetailsFactory($resource,$q,DASHBOARD_CONSTANTS,$http){
		
		var logout=function(){
			var logoutResource=$resource(DASHBOARD_CONSTANTS.LOGOUT_URL);
			var defered=$q.defer();
			logoutResource.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		var checkSessionExist=function(){
			var defered=$q.defer();
			    $http.get("/checkUser")
                .success(function (userDetails){
                	defered.resolve(userDetails);
                })
                .catch(function(error){
                	defered.reject(error);
                });
			return defered.promise;
		}
		
		return {
			"logout":logout,
			"checkSessionExist":checkSessionExist
		}
		
	};
	
	dashboardUserDetailsFactory.$inject=['$resource','$q','DASHBOARD_CONSTANTS','$http'];
	
	angular.module('amoeba.dashboard').service('dashboardUserDetailsFactory',dashboardUserDetailsFactory);
	
})();





(function(){
	
	function problemsFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		
		function submitProblem(problem){
			var submitProblem=$resource("/problems/createProblem");
			var defered=$q.defer();
			submitProblem.save(problem,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getProblems(){
			var submitProblem=$resource("/problems/allProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getMyProblems(){
			var submitProblem=$resource("/problems/myProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getProblem(problemId){
			var submitProblem=$resource("/problems/problem/"+problemId);
			var defered=$q.defer();
			submitProblem.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function acceptProblem(problem){
			var submitProblem=$resource("/problems/acceptProblem");
			var defered=$q.defer();
			submitProblem.save(problem,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		

		function getAcceptedProblems(){
			var submitProblem=$resource("/problems/acceptedProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function submitSolution(solution){
			var submitProblem=$resource("/problems/solution");
			var defered=$q.defer();
			submitProblem.save(solution,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getSolutionByProblemId(problemId){
			var submitProblem=$resource("/problems/solution/"+problemId);
			var defered=$q.defer();
			submitProblem.get(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getBlockedAcceptedProblems(){
			var submitProblem=$resource("/problems/blockedAcceptedProblems");
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		
		function saveNewConsultant(name,id){
			var payload =  {"email":name,"problemId":id};
			var submitProblem=$resource("/problems/newConsultant");
			var defered=$q.defer();
			submitProblem.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getComments(problemId){
			var submitProblem=$resource("/comments/"+problemId);
			var defered=$q.defer();
			submitProblem.query(
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function addComment(problem){
			var payload =  {"comment":problem.comment,"problemId":problem._id};
			var submitProblem=$resource("/comments");
			var defered=$q.defer();
			submitProblem.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fileUpload(file){
			var defered=$q.defer();
			 var payload = new FormData();
			 
			 payload.append('uploadFile', file);
           
			 $.ajax({
					type : 'POST',
					url : '/problems/fileUpload',
					data : payload,
					contentType : false,
					processData : false,
					success : function(response) {
						 defered.resolve(response);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
		
				});
			return defered.promise;
		};
		
		
		
		return {
			submitProblem:submitProblem,
			getProblems:getProblems,
			getMyProblems:getMyProblems,
			getProblem:getProblem,
			acceptProblem:acceptProblem,
			getAcceptedProblems:getAcceptedProblems,
			submitSolution:submitSolution,
			getSolutionByProblemId:getSolutionByProblemId,
			getBlockedAcceptedProblems:getBlockedAcceptedProblems,
			saveNewConsultant:saveNewConsultant,
			getComments:getComments,
			addComment:addComment,
			fileUpload:fileUpload
		};
	};
	
	problemsFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('problemsFactory',problemsFactory);
	
})();





(function(){
	
	function profileFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		function updateProfile(profileDetails){
			
			
			var updateProfileResource=$resource(DASHBOARD_CONSTANTS.PROFILE_UPDATE_URL);
			var defered=$q.defer();
			var payload =  {"_id":profileDetails._id,"city":profileDetails.city,"state":profileDetails.state,
					"country":profileDetails.country,"firstName": profileDetails.firstName,"lastName": profileDetails.lastName,
					"mobileNumber":profileDetails.mobileNumber,"address":profileDetails.address,"cases":profileDetails.cases
					,"zipcode":profileDetails.zipcode,"age":profileDetails.age,"height":profileDetails.height,
					"weight":profileDetails.weight,"category":profileDetails.category};
				updateProfileResource.save(payload,
			    function(response){
					defered.resolve(response);
				},function(error){
					defered.reject(error);
				});
				return defered.promise;
			};
			
			function uploadFile(profileDetails){
				var defered=$q.defer();
				 var payload = new FormData();
				 
				 payload.append('uploadImage', profileDetails.uploadImage);
	            
				 $.ajax({
						type : 'POST',
						url : '/profile/fileUpload',
						data : payload,
						contentType : false,
						processData : false,
						success : function(response) {
							 defered.resolve(response);
						},
						error : function(xhr, status) {
							 defered.reject("error");
						}
			
					});
				return defered.promise;
			};	
			
			
		function updatePassword(password){
			var updatePasswordResource=$resource(DASHBOARD_CONSTANTS.CHANGE_PASSWORD_URL);
			var defered=$q.defer();
			var payload =  {"password" : password};
			updatePasswordResource.save(payload,
		    function(response){
				defered.resolve(response);
			},function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			updateProfile:updateProfile,
			updatePassword:updatePassword,
			uploadFile:uploadFile
		};
	};
	
	profileFactory.$inject=['$q','DASHBOARD_CONSTANTS','$resource'];
	
	angular.module('amoeba.dashboard').factory('profileFactory',profileFactory);
	
})();





angular.module('amoeba.dashboard')
.filter('substringCreatedDate', function() {
  return function(input) {
	  if(input===undefined){
		  var year=new Date().getFullYear();
		  var month=new Date().getMonth()+1;
		  month=month<10?"0"+month:month;
		  var date=new Date().getDate();
		  return year+"-"+month+"-"+date;
	  }
    return input.substring(0,11);
  };
}).filter('camelCase', function() {
	  return function(input) {
		  var result="";
		 if(input!==undefined){
			 var inputArray=input.trim().split(" ");

			  for(var i=0;i<inputArray.length;i++){
			  var temp=inputArray[i];
			  inputArray[i]=temp[0].toUpperCase()+inputArray[i].substring(1,inputArray[i].length);
			  }
			 
			  for(var i=0;i<inputArray.length;i++){
			  result=result+" "+inputArray[i];
			  } 
		 }
			 
			  return result;
	  };
}).filter('delimiterForEdition', function() {
		  return function(input) {
			  var result="";
			 if(input!==undefined){
				 var inputArray=input.trim().split(":");
				 if(inputArray.length>1){
					 result = inputArray[1];
				 }
				 result = inputArray[0];
			 }
				 
				  return result;
		  };
 }).filter('dateFormat', function() {
			  return function(input) {
				  var months=["January", "February", "March", "April", "May",
				              "June", "July", "August", "September", "October",
				              "November", "December"];
				  var inputArray=input.trim().split("/");
				  if(inputArray.length>1){
					  return inputArray[1]+" "+months[inputArray[0]-1]+" "+inputArray[2];
				  }else{
					  var inputArray=input.trim().split("T");
					  var dates=inputArray[0].split("-");
					  return dates[2]+" "+months[dates[1]-1]+" "+dates[0];
				  }
			  };
})
.filter('displayTab', function() {
			  return function(input) {
				var tabName=""
					if(input==="allChallenges"){
						tabName="All Posts";
					}else if(input==="myChallenges"){
						tabName="My Posts";
					}else if(input==="subcribedChallenges"){
						tabName="Subcribed Challenges";
					}else if(input==="contactUs"){
						tabName="Contact Us";
					}else if(input==="createChallenge"){
						tabName="Post Challenge";
					}else if(input==="createLearning"){
						tabName="Share Learning";
					}else if(input==="profile"){
						tabName="My Profile";
					}else if(input==="faq"){
						tabName="FAQ";
					}else{
						tabName=input;
					}
				  return tabName
			  };
}).filter('displayDescriptionForTab', function() {
	  return function(input) {
			var tabName=""
				if(input==="allChallenges"){
					tabName="List of all Challenges & Learnings";
				}else if(input==="myChallenges"){
					tabName="My Challenges & Learnings";
				}else if(input==="subcribedChallenges"){
					tabName="Subcribed Challenges";
				}else if(input==="contactUs"){
					tabName="Feel free to Contact us";
				}else if(input==="createChallenge"){
					tabName="Post Challenge";
				}else if(input==="createLearning"){
					tabName="Share Learning";
				}else if(input==="profile"){
					tabName="My Profile";
				}else if(input==="faq"){
					tabName="Frequently Asked Questions";
				}else if(input==="dashboard"){
					tabName="Dashboard";
				}else if(input==="categories"){
					tabName="Add or Update Categories";
				}else {
					tabName=input;
				}
			  return tabName
		  };
});

angular.module('amoeba.dashboard')
    .filter('toTrustHtml', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

(function(){
	
	function dashboardSpinnerService($loading){
		
		this.startSpinner=function(){
			$loading.start('home');
		}
		
		this.stopSpinner=function(){
			$loading.finish('home');
		}
		
	};
	
	dashboardSpinnerService.$inject=['$loading'];
	
	angular.module('amoeba.dashboard').service('dashboardSpinnerService',dashboardSpinnerService);
	
})();





(function(){
	
	function dashboardUserDetailsService($rootScope,$state,dashboardUserDetailsFactory,dashboardSpinnerService,$uibModal){
		
		this.userDetails={};
		
		this.setUserDetails=function(user){
			angular.extend(this.userDetails,user);
		};
		
		this.addRemoveClassToSideBar=function(){
			if(angular.element('#sideBar').hasClass("sidebar-collapse")){
				angular.element('#sideBar').removeClass("sidebar-collapse");
			}else{
				angular.element('#sideBar').addClass("sidebar-collapse");
			};
		};
		
		this.logout=function(){
			dashboardSpinnerService.startSpinner();
			dashboardUserDetailsFactory.logout().then(function(reponse){
				this.userDetails=undefined;
				dashboardSpinnerService.stopSpinner();;
				$state.go('login');
			}).catch(function(error){
				
			});
		};
		
	};
	
	dashboardUserDetailsService.$inject=['$rootScope','$state','dashboardUserDetailsFactory','dashboardSpinnerService','$uibModal'];
	
	angular.module('amoeba.dashboard').service('dashboardUserDetailsService',dashboardUserDetailsService);
	
})();



