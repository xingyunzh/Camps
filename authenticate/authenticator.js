
var jwt = require('jsonwebtoken');
var util = require('../util/util');
var scr = require('../controllers/repositories/systemConfigRepository');

var secret = null;

function getSecret(){
	if (secret) {
		return secret;
	}else{
		return scr.getTokenSecret().secret;
	}

}

module.exports.verify = function(tokenString,callback){
	jwt.verify(tokenString,getSecret(),callback);
};

module.exports.create = function(userId,callback){
	jwt.sign({
		userId:userId
	},getSecret(),{
		expiresIn:3600
	},callback);
};

module.exports.authenticate = function(req, res, next) {

	var tokenString = req.get('x-access-token');

	if (tokenString === undefined || tokenString == null) {
		res.send(util.wrapBody('Invalid token','E'));
	}else{
		jwt.verify(tokenString,getSecret(),function(err,tokenObject){
			if (err) {
				res.send(util.wrapBody('Invalid token','E'));
			}else{
				req.token = tokenObject;
				next();
			}
		});
	}
};