var express = require('express');
var router = express.Router();
var checkSession=require("../services/checkSessionService");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/logout', function(request, response) {
	request.session.reset();
	console.log("logout.."+ request.session.user)
	response.send({"logout":true});
	});

router.get('/checkUser',checkSession.requireLogin,function (req,res,next){
	  var user=req.session.user;
	  res.json(user);
});

module.exports = router;
