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
							"gender":loginDetails.gender,"mobileNumber":loginDetails.mobileNumber,"address":loginDetails.address,"role":loginDetails.role
							,"zipcode":loginDetails.zipcode,"age":loginDetails.age,"height":loginDetails.height,"weight":loginDetails.weight}
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



