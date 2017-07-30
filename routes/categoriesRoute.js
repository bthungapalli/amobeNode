var express = require('express');
var router = express.Router();
var categoryService=require("../services/categoryService");
var checkSession=require("../services/checkSessionService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");

router.get('/allCategories',function (req,res,next){
		categoryService.getAllCategories(function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.post('/createCategory',checkSession.requireLogin,function (req,res,next){
		var categoryDetails = req.body;
		 var user=req.session.user;
		categoryService.createOrUpdateCategory(categoryDetails,user,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});

router.post('/deleteCategory',checkSession.requireLogin,function (req,res,next){
		var categoryDetails = req.body;
		categoryService.deleteCategory(categoryDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});

router.post('/requestCategory',checkSession.requireLogin,function (req,res,next){
	var categoryDetails = req.body;
	 var user=req.session.user;
		
		var subject =  nconf.get("mail").subject+" Request Category ";
		var template = "requestCategory.html";

		var context =  {
				title : nconf.get("mail").appName,
				userName : user.firstName + user.lastName,
				category : categoryDetails.categoryName,
				appURL : nconf.get("mail").appURL,
				appName : nconf.get("mail").appName
			};
		
		mailUtil.sendMail(nconf.get("smtpConfig").authUser,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
            console.log("Email sent to: "+user.email);
		});
		
		res.json(categoryDetails);
});


module.exports = router;
