
var jwt = require('jsonwebtoken');

var secret = "xingyunzh-campro-secret";

module.exports.verify = function(tokenString,callback){
	jwt.verify(tokenString,secret,callback);
}

module.exports.create = function(userId,callback){
	console.log('userId',userId);
	
	jwt.sign({
		userId:userId
	},XINGYUNZH_UNIVERSAL_SECRET,{
		expiresIn:3600
	},callback);
}

module.exports.authenticate = function(req, res, next) {
	console.log('inside authenticate');

	var tokenString = req.get('x-access-token');

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
}