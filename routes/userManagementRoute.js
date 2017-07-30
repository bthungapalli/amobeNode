var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var checkSession=require("../services/checkSessionService");

router.get('/allUsers',checkSession.requireLogin,function (req,res,next){
		userService.getAllUsers(function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.post('/activeOrInActivateUser',checkSession.requireLogin,function (req,res,next){
		var userDetails = req.body;
		userService.activeOrInActivateUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});


module.exports = router;
