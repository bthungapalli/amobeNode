var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var checkSession=require("../services/checkSessionService");
var multer = require('multer');
var nconf = require('nconf');

var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, nconf.get("amoeba").profilePath);
	  },
	  filename: function (req, file, callback) {
		  var filename = req.session.user.email+Math.random()+".jpg";
		    callback(null,filename);
	  }
	});

	var upload = multer({ storage : storage}).single('uploadImage');
	
	

	router.post('/fileUpload',checkSession.requireLogin,function (req,res,next){
		upload(req,res,function(err){
		        if(err){
		             res.json({error_code:1,err_desc:err});
		        }
		        
		        userService.updateImagePath(req.file.path,req.session.user._id,function(err,user){
		    		if(err)
		        		res.send("error");
		    		res.json(req.file);
		    	});
		        
		    });
			
	});	

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
