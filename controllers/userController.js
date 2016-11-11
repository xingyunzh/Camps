var userRepository = require('./repositories/userRepository');
var http = require('http');
var uidHelper = require('../util/uidHelper');
var util = require('../util/util');
var stringHelper = require('../util/shared/stringHelper');
var queryString = require('querystring');
var authenticator = require('../authenticate/authenticator');


exports.loginByEmail = function(req,res){

	if (!util.checkParam(req.body,['email','password'])) {
		res.send(util.wrapBody('Invalid Parameter','E'));
	}else{
		login(req,res,'email');
	}
};

exports.loginByWechat = function(req,res){
	if (!util.checkParam(req.body,['code'])) {
		res.send(util.wrapBody('Invalid Parameter','E'));
	}else{
		login(req,res,'wechat');
	}
};

exports.update = function(req,res){

	var id = req.token.userId;

	var user = {
		name:req.body.name,
		nickname:req.body.nickname,
		skills:req.body.skills,
		sector:req.body.sector
	};

	userRepository.updateById(id,user,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			res.send(util.wrapBody(result));
		}
	});
}

exports.getProfileById = function(req,res){
	var id = req.params.id;

	userRepository.findById(id,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			var responseBody = {
				user:result
			};

			res.send(util.wrapBody(responseBody));
		}
	});
}

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



function login(req,res,type){
	var email = null;
	var password = null;
	var code = null;
	var loginResult = null;
	var latestUser = null;
	var latestProfile = null;
	var token = null;

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
		console.log('state:',toState);

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
					stateMachine(null,STATE_INVALID_CREDENTIALS);
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
					token = newToken;
					stateMachine(err,STATE_SEND_RESPONSE);
				});
			break;
			case STATE_INVALID_CREDENTIALS:
				token = null;
				stateMachine(null,STATE_SEND_RESPONSE);
			break;
			case STATE_SEND_RESPONSE:
				var responseBody = {
					token:token,
					user:latestUser
				};
				console.log("resbody:",responseBody);
				res.send(util.wrapBody(responseBody));
			break;
			default:
				console.log('Invalid State');
				errMsg = 'Internal Error';
				stateMachine(null,STATE_SEND_RESPONSE);
		}
	}
}
