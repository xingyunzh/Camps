var userRepository = require('../repositories/userRepository');
var uidHelper = require('../util/uidHelper');
var util = require('../util/util');
var stringHelper = require('../util/shared/stringHelper');
var authenticator = require('../authenticate/authenticator');
var q = require('q');


exports.loginByEmail = function(req,res){

	if (!util.checkParam(req.body,['email','password'])) {
		res.send(util.wrapBody('Invalid Parameter','E'));
	}else{
		loginP(req,res,'email');
	}
};

exports.loginByWechat = function(req,res){
	if (!util.checkParam(req.body,['code'])) {
		res.send(util.wrapBody('Invalid Parameter','E'));
	}else{
		loginP(req,res,'wechat');
	}
};

exports.update = function(req,res){
	var id = req.token.userId;

	userRepository.updateById(id, req.body).then(function(result){
        res.send(util.wrapBody(result));
    }).catch(function(error){
        console.log(err);
        res.send(util.wrapBody('Internal Error','E'));
    });
};

exports.getProfileById = function(req,res){
	var id = req.params.id;

    userRepository.findById(id).then(function(result){
        var responseBody = {
            user:result
        };
        res.send(util.wrapBody(responseBody));
    }).catch(function(err){
        console.log(err);
        res.send(util.wrapBody('Internal Error','E'));
    });
};

exports.listUser = function(req,res){
	var conditions = {
		keyword:req.body.keyword,
		role:req.body.role,
		pageSize:req.body.pageSize,
		pageNum:req.body.pageNum
	};

	userRepository
	.query(conditions)
	.then(function(result){
		var responseBody = {
			users:result
		};

		res.send(util.wrapBody(responseBody));
	}).catch(function(err){
		if (typeof err == String) {
			res.send(util.wrapBody(err,'E'));
		} else {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}
	});
};

function loginP(req,res,type){
	var token = null;

	var deferred = q.defer();
	if (type == 'email') {
		var email = req.body.email;
		var	password = req.body.password;

		uidHelper.loginByEmail(email,password,function(err,result){
			if (err) {
				deferred.reject(err);
			}else{
				deferred.resolve(result);
			}
		});
	}else if(type == 'wechat'){
		var code = req.body.code;
		uidHelper.loginByWechat(code,function(err,result){
			if (err) {
				deferred.reject(err);
			}else{
				deferred.resolve(result);
			}
		});
	}else{
		console.log('Invalid Type:',type);
		deferred.reject(new Error('Internal Error'));
	}

	deferred.promise.then(function getProfile(result){
		var user = result.user;

		if (!user) {
			return null;
		}

		return userRepository
		.findByUid(user.userId)
		.then(function(userResult){
			if(userResult == null){
				return importProfile(user.userId,result.token);
			}else{
				return userResult;
			}
		});
	}).then(function generateToken(user){
		if (!user) {
			return null;
		}

		var deferred = q.defer();

		authenticator.create(user._id,function(err,newToken){
			if (err) {
				deferred.reject(err);
			}else{
				res.setHeader('set-token',newToken);
				deferred.resolve(user);
			}				
		});

		return deferred.promise;
	}).then(function sendResponse(user){
		
		var responseBody = {
			user:user
		};

		res.send(util.wrapBody(responseBody));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

}

function importProfile(userId,token){
	var deferred = q.defer();
	uidHelper.getProfile(token,function(err,data){
		if (err) {
			deferred.reject(err);
		}else{
			var profile = data.profile;

			var user = {
				uid:userId
			};

			if (!!profile.nickname) {
				user.nickname = profile.nickname;
			} else {
				user.nickname = '新用户' + stringHelper.generate(4,'all');
			}

		 	deferred.resolve(userRepository.create(user));
		}
	});

	return deferred.promise;
}

function login(req,res,type){
	var email = null;
	var password = null;
	var code = null;
	var loginResult = null;
	var latestUser = null;
	var latestProfile = null;

	const STATE_LOGIN_WECHAT = 1;
	const STATE_LOGIN_EMAIL = 2;
	const STATE_IS_FRIST_TIME = 3;
	const STATE_GET_PROFILE = 4;
	const STATE_CREATE_USER = 5;
	const STATE_CREATE_TOKEN = 6;
	const STATE_INVALID_CREDENTIALS = 7;
	const STATE_SEND_RESPONSE = 0;

	if (type == 'email') {
		stateMachine(null,STATE_LOGIN_EMAIL);
	}else if (type == 'wechat') {
		stateMachine(null,STATE_LOGIN_WECHAT);
	}else{
		console.log('Invalid Type:',type);
		res.send(util.wrapBody('Internal Error','E'));
	}

	function stateMachine(err,toState){
		//console.log('state:',toState);

		if (err) {
			console.log('error:',err);
			errMsg = 'Internal Error';
			toState = STATE_SEND_RESPONSE;
		}

		switch(toState){
			case STATE_LOGIN_WECHAT:
				code = req.body.code;

				uidHelper.loginByWechat(code,function(err,result){
					loginResult = result;
					stateMachine(err,STATE_IS_FRIST_TIME);
				});
			break;
			case STATE_LOGIN_EMAIL:
				email = req.body.email;
				password = req.body.password;

				uidHelper.loginByEmail(email,password,function(err,result){
					loginResult = result;
					stateMachine(err,STATE_IS_FRIST_TIME);
				});
			break;
			case STATE_IS_FRIST_TIME:
				if (!loginResult.token) {
					latestUser = null;
					stateMachine(null,STATE_SEND_RESPONSE);
				}else{
					userRepository
					.findByUid(loginResult.user.userId)
					.then(function(userResult){
						latestUser = userResult;
						if(userResult == null){
							stateMachine(null,STATE_GET_PROFILE);
						}else{
							stateMachine(null,STATE_CREATE_TOKEN);
						}
					}).catch(function(err){
						stateMachine(err,STATE_SEND_RESPONSE);
					});
				}
			break;
			case STATE_GET_PROFILE:
				uidHelper.getProfile(loginResult.token,function(err,data){
					latestProfile = data.profile;
					stateMachine(err,STATE_CREATE_USER);
				});
			break;
			case STATE_CREATE_USER:
				var user = {};
				if (!!latestProfile.nickname) {
					user.nickname = latestProfile.nickname;
				} else {
					user.nickname = '新用户' + stringHelper.generate(4,'all');
				}
				
				user.uid = loginResult.user.userId;

				userRepository.create(user,function(err,result){
					latestUser = result;
					stateMachine(err,STATE_CREATE_TOKEN);
				});
			break;
			case STATE_CREATE_TOKEN:
				authenticator.create(latestUser._id,function(err,newToken){
					res.setHeader('set-token',newToken);					
					stateMachine(err,STATE_SEND_RESPONSE);
				});
			break;
			case STATE_SEND_RESPONSE:
				var responseBody = {
					user:latestUser
				};
				//console.log("resbody:",responseBody);
				res.send(util.wrapBody(responseBody));
			break;
			default:
				console.log('Invalid State');
				errMsg = 'Internal Error';
				stateMachine(null,STATE_SEND_RESPONSE);
		}
	}
}
