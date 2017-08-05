var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var mailUtil=require("../utils/MailUtil");
var multer = require('multer');
var nconf = require('nconf');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPasswordForAmoeba');


router.post('/',function (req,res,next){
		var userDetails = req.body;
		userDetails.password = cryptr.encrypt(userDetails.password);
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
        		res.send("error");
			    req.session.user = createdUser;
						
			    var subject =  nconf.get("mail").subject+" Register Confirmation for Amoeba";
				var template = "registerConfirmation.html";

				var context =  {
						title : nconf.get("mail").appName,
						username : createdUser.firstName,
						appURL : nconf.get("mail").appURL,
						appName : nconf.get("mail").appName,
						activationURL:nconf.get("context").path+"registrationConfirmation?token="+createdUser.token
					};
				mailUtil.sendMail(createdUser.email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
				
			});
						
						
			res.json(createdUser);
		});
});

router.get('/emailValidation/:emailId',function (req,res,next){
		var id = req.params.emailId;
		userService.getUser(id,function(err,user){
			if(err)
        		res.send("error");
						if(user!=null){
								res.json({"alreadyExist":true});
						}else{
								res.json({"alreadyExist":false});
						}

		});
});


router.get('/registrationConfirmation',function (req,res,next){
	var token = req.query.token;
	
	userService.getUserForToken(token,function(err,user){
		if(err)
    		res.send("error");
					if(user==null){
							res.json({"message":"Invalid Token"});
					}else{
						userService.activateUserByToken(token,function(err,user){
							if(err)
					    		res.send("error");
							res.json({"message":"Successfully User Activated"});
						});
					}

	});
	
});



module.exports = router;
