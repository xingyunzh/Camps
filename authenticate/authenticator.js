
var jwt = require('jsonwebtoken');
var scr = require('../controllers/repositories/systemConfigRepository');

var secret = getSecret();

getSecret();

function getSecret(){
	scr
	.getTokenSecret()
	.then(function(data){
		secret = data.secret;
	});
}

module.exports.verify = function(tokenString,callback){
	jwt.verify(tokenString,secret,callback);
};

module.exports.create = function(userId,callback){
	
	jwt.sign({
		userId:userId
	},secret,{
		expiresIn:3600
	},callback);
};

module.exports.authenticate = function(req, res, next) {
	console.log('inside authenticate');

	var tokenString = req.get('x-access-token');

	if (tokenString === undefined || tokenString == null) {
		res.send(util.wrapBody('Invalid token','E'));
	}else{
		jwt.verify(tokenString,secret,function(err,tokenObject){
			if (err) {
				res.send(util.wrapBody('Invalid token','E'));
			}else{
				req.token = tokenObject;
				console.log('token',tokenObject);
				next();
			}
		});
	}
};