var express = require('express');
var router = express.Router();
var problemsService=require("../services/problemsService");
var checkSession=require("../services/checkSessionService");
var userService=require("../services/userService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");
var multer = require('multer');

router.get('/allProblems',checkSession.requireLogin,function (req,res,next){
	  var user=req.session.user;
		problemsService.getAllProblems(user,function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});

router.get('/myProblems',checkSession.requireLogin,function (req,res,next){
	  var user=req.session.user;
		problemsService.getMyProblems(user,function(err,users){
			if(err)
      		res.send("error");
			res.json(users);
		});
});

router.post('/acceptProblem',checkSession.requireLogin,function (req,res,next){
	var problem = req.body;
	var user=req.session.user;
		problemsService.acceptProblem(user,problem,function(err,responseproblem){
			if(err)
    		res.send("error");
			
			var subject =  nconf.get("mail").subject+"Problem Accepted";
			var template = "acceptedProblem.html";

			var context =  {
					title : nconf.get("mail").appName,
					appURL : nconf.get("mail").appURL,
					appName : nconf.get("mail").appName,
					problemTitle: problem.title,
					problemCategory:problem.category,
					problemSubcategory:problem.subcategory,
					consultant:user.firstName+ " " +user.lastName
				};
			mailUtil.sendMail(problem.created_by,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
			
		});
			
			res.json(responseproblem);
		});
});

router.post('/createProblem',checkSession.requireLogin,function (req,res,next){
		var problem = req.body;
		var user=req.session.user;
		
			problemsService.getProblemById(problem._id,function(err,presentProblem){
				
				if(err)
					res.send("error");
				
				problemsService.createOrUpdateProblem(user,problem,function(err,problemResponse){
					if(err)
		        		res.send("error");
					if((presentProblem !=null && presentProblem.status=="DRAFT" && problemResponse.status=="SAVE") || (problem._id==undefined && problem.status=="SAVE")){
						userService.getUsersBasedonCatAndSubcategory(problem,function(err,users){
							users.forEach(function(user){
								var subject =  nconf.get("mail").subject+" New Problem Created";
								var template = "newProblem.html";

								var context =  {
										title : nconf.get("mail").appName,
										appURL : nconf.get("mail").appURL,
										appName : nconf.get("mail").appName,
										problemTitle: problem.title,
										problemCategory:problem.category,
										problemSubcategory:problem.subcategory,
										name:user.firstName+ " " +user.lastName
									};
								mailUtil.sendMail(user.email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
								
							});
								
							});
						});
					};
				    
					res.json(problemResponse);
				});
				
			})
		
});


router.post('/solution',checkSession.requireLogin,function (req,res,next){
	var solution = req.body;
	var user=req.session.user;
	problemsService.createOrUpdateSolution(user,solution,function(err,solutionResponse){
		if(err)
    		res.send("error");
		
		var subject =  nconf.get("mail").subject+" Solution Provided";
		var template = "solution.html";

		var context =  {
				title : nconf.get("mail").appName,
				appURL : nconf.get("mail").appURL,
				appName : nconf.get("mail").appName,
				problemTitle: solution.problemTitle,
			};
		mailUtil.sendMail(solution.problemCreatedBy,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
		
	});

					res.json(solutionResponse);
	});
});




var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, nconf.get("recall").filesPath);
	  },
	  filename: function (req, file, callback) {
		  var datetimestamp = Date.now();
	    callback(null, file.fieldname + '-' + file.originalname.split('.')[0] + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	  }
	});

	var upload = multer({ storage : storage}).single('file');


router.post('/fileUpload',checkSession.requireLogin,function (req,res,next){
	upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.file);
    });
});

router.post('/filterRecalls',checkSession.requireLogin,function (req,res,next){
		var recallFilter = req.body;
			var user=req.session.user;
		problemsService.getRecallsByFilter(user,recallFilter,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});


router.get('/problem/:id',checkSession.requireLogin,function (req,res,next){
		var problemId=req.params.id;
		problemsService.getProblemById(problemId,function(err,problem){
			if(err)
        		res.send("error");
				res.json(problem);
		});
});


router.get('/solution/:problemId',checkSession.requireLogin,function (req,res,next){
	var problemId=req.params.problemId;
		
		problemsService.getSolutionByProblemId(problemId,function(err,solution){
			if(err)
				res.json(err);
			
			res.json(solution);
		})
});





router.get('/acceptedProblems',checkSession.requireLogin,function (req,res,next){
	var user=req.session.user;
	problemsService.getAcceptedProblems(user,function(err,problems){
		if(err)
    		res.send("error");
		res.json(problems);
	});
});


router.delete('/:id',checkSession.requireLogin,function (req,res,next){
		var recallId=req.params.id;
		problemsService.deleteRecall(recallId,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});

router.get('/download/:fileName',function(request,response,next){
	var fileName = request.params.fileName;
	console.log(fileName);
	var file = nconf.get("recall").filesPath + fileName ;
	  response.download(file,fileName,function(err){
		  if(err)
			  response.json("Error Occured while downloading");
	  })
	
});


module.exports = router;
