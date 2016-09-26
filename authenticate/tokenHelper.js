
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