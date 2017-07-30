var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPasswordForAmoeba');

router.post('/',function (req,res,next){
		var userDetails = req.body;
		userService.checkUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
			if(user==null){
				res.json(null);
			}else{
				decryptedPassword = cryptr.decrypt(user.password);
				if(decryptedPassword==userDetails.password){
					req.session.user = user;
					 res.json(user);
				}else{
					res.json(null);
				}
			}
			
		});
});




module.exports = router;
