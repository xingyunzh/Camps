var userRepository = require('./repositories/userRepository');
var http = require('http');
var uidHelper = require('../util/uidHelper');
var util = require('../util/util.js');
var queryString = require('querystring');
var authenticator = require('../authenticate/authenticator.js');


exports.loginByEmail = function(req,res){

	util.checkParam(req.body,['email','password'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		}else{
			login(req,res,'email');
		}
	});	
}

exports.loginByWechat = function(req,res){
	util.checkParam(req.body,['code'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		}else{
			login(req,res,'wechat');
		}
	});	
}

exports.update = function(req,res){
	// util.checkParam(req.body,['name','nickname'],function(err){
	// 	if (err) {
	// 		console.log(err);
	// 		res.send(util.wrapBody('Invalid Parameter','E'));
	// 		return;
	// 	}
	// });

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

	userRepository.query(conditions,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			var responseBody = {
				users:result
			};

			res.send(util.wrapBody(responseBody));
		}
	});
}



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
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			switch(toState){
				case STATE_LOGIN_WECHAT:
					code = req.body.code;

					uidHelper.loginByWechat(code,function(err,result){
						loginResult = result;
						console.log('loginResult',loginResult);
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
						userRepository.findByUid(loginResult.user.userId,function(err,userResult){
							latestUser = userResult;
							console.log('latestUser',latestUser);
							if(userResult == null){
								stateMachine(err,STATE_GET_PROFILE);
							}else{
								stateMachine(err,STATE_CREATE_TOKEN);
							}
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
					user.nickname = latestProfile.nickname;
					user.uid = loginResult.userId;

					userRepository.create(user,function(err,result){
						console.log("latestUser:",result);
						latestUser = result;
						stateMachine(err,STATE_CREATE_TOKEN);
					});
				break;
				case STATE_CREATE_TOKEN:
					authenticator.create(latestUser._id,function(err,newToken){
						token = newToken;
						console.log('token',newToken);
						stateMachine(err,STATE_SEND_RESPONSE);
					});
				break;
				case STATE_SEND_RESPONSE:
					var responseBody = {
						token:token,
						user:latestUser
					};
					console.log("resbody:",responseBody);
					res.send(util.wrapBody(responseBody));
				break;
				case STATE_INVALID_CREDENTIALS:
					token = null;
					stateMachine(null,STATE_SEND_RESPONSE);
				break;
				default:
					console.log('Invalid State');
					res.send(util.wrapBody('Internal Error','E'));
			}
		}
	}
}
