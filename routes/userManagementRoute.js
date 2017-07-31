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


router.get('/usersForProblem/:category/:subcategory/:name',checkSession.requireLogin,function (req,res,next){
	var category=req.params.category;
	var subcategory=req.params.subcategory;
	var name=req.params.name;
	userService.getUsersForProblem(category,subcategory,name,function(err,users){
		if(err)
    		res.send("error");
		res.json(users);
	});
});


module.exports = router;
