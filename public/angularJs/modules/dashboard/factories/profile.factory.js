(function(){
	
	function profileFactory($q,DASHBOARD_CONSTANTS,$resource){
		
		function updateProfile(profileDetails){
			
			
			var updateProfileResource=$resource(DASHBOARD_CONSTANTS.PROFILE_UPDATE_URL);
			var defered=$q.defer();
			var payload =  {"_id":profileDetails._id,"city":profileDetails.city,"state":profileDetails.state,
					"country":profileDetails.country,
					"mobileNumber":profileDetails.mobileNumber,"address":profileDetails.address
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



