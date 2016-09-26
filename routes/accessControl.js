var tokenHelper = require('../authenticate/tokenHelper.js');
var util = require('../util/util.js');

var router = require('express').Router();

router.use('/api/*',function(req, res, next) {
	console.log('inside ac');

	var tokenString = req.body.token;

	if (tokenString == undefined || tokenString == null) {
		res.send(util.wrapBody('Invalid token','E'));
	}else{
		tokenHelper.verify(tokenString,function(err,tokenObject){
			if (err) {
				res.send(util.wrapBody('Invalid token','E'));
			}else{
				req.token = tokenObject;
				console.log('token',tokenObject);
				next();
			}
		})
	}
});

module.exports = router;
