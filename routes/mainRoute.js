var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/logout', function(request, response) {
	request.session.reset();
	console.log("logout.."+ request.session.user)
	response.send({"logout":true});
	});

module.exports = router;
