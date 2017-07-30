var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var checkSession=require("../services/checkSessionService");

router.post('/',checkSession.requireLogin,function (req,res,next){
		var userDetails = req.body;
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
        		res.send("error");
			res.json(createdUser);
		});
});

router.get('/',checkSession.requireLogin,function (req,res,next){
	var userDetails =req.session.user;
	
	userService.getUser(userDetails,function(err,user){
		if(err)
    		res.send("error");
		res.json(user);
	});
});


module.exports = router;
