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