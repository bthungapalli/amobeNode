var express = require('express');
var router = express.Router();
var commentService=require("../services/commentService");
var checkSession=require("../services/checkSessionService");

router.post('/',checkSession.requireLogin,function (req,res,next){
		var commentDetails = req.body;
		var userDetails =req.session.user;
		commentService.createComment(commentDetails,userDetails,function(err,createdCommentDetails){
			if(err)
        		res.send("error");
			res.json(createdCommentDetails);
		});
});

router.get('/:problemId',checkSession.requireLogin,function (req,res,next){
	var problemId=req.params.problemId;
	commentService.getCommentsForProblemId(problemId,function(err,comments){
		if(err)
    		res.send("error");
		res.json(comments);
	});
});


module.exports = router;
