var express = require('express');
var router = express.Router();
var nconf = require('nconf');

var userService=require("../services/userService");
var mailUtil=require("../utils/MailUtil");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPasswordForAmoeba');



router.get('/:email',function (req,res,next){
		var email = req.params.email;
		userService.getUser(email,function(err,user){
			if(err)
        		res.send("error");
			
			if(user==null){
				res.json({"emailSent":false});
			}else{

				var subject =  nconf.get("mail").subject+"Password for Amoeba";
				var template = "forgotPassword.html";
				var context =  {
						title : nconf.get("mail").appName,
						username : user.firstName,
						password : cryptr.decrypt(user.password),
						appURL : nconf.get("mail").appURL,
						appName : nconf.get("mail").appName
					};
				mailUtil.sendMail(email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
				
			});
				res.json({"emailSent":true});
		};
});
});



module.exports = router;
