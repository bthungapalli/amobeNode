var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPasswordForAmoeba');


router.post('/',function (req,res,next){
		var userDetails = req.body;
		userDetails.password = cryptr.encrypt(userDetails.password);
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
        		res.send("error");
						req.session.user = createdUser;
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


module.exports = router;
