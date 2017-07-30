
var checkSession =function(){

return{

 requireLogin :function(req, res, next) {
	 console.log("inside require login"+req.session.user);
	  if (!req.session.user) {
	    res.json({"sessionExpired":true});
	  } else {
	    next();
	  }
	}


};
};


module.exports=checkSession();
