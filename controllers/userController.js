var User = require('../models/user.js');
var http = require('http');
var uidHelper = require('../util/uidHelper');
var util = require('../util/util.js');
var queryString = require('querystring');


exports.loginByEmail = function(req,res){
	var email = null;
	var password = null;
	// var loginResult = null;
	// var latestUser = null;

	const STATE_CHECK_PARAM = 1;
	const STATE_LOGIN = 2;

	stateMachine(null,STATE_CHECK_PARAM);

	function stateMachine(err,toState){
		console.log('state:',toState);

		if (err) {
			
			console.log('error:',err);
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			switch(toState){
				case STATE_CHECK_PARAM:
					util.checkParam(req.body,['email,password'],function(err){
						stateMachine(err,STATE_LOGIN_EMAIL);
					});
				break;
				case STATE_LOGIN:
					login(req,res,'email');
				break;
				default:
					console.log('Invalid State');
					res.send(util.wrapBody('Internal Error','E'));
			}
		}
	}	
}

exports.loginByWechat = function(req,res){
	var code = null;
	//var loginResult = null;

	const STATE_CHECK_PARAM = 1;
	const STATE_LOGIN = 2;

	stateMachine(null,STATE_CHECK_PARAM);

	function stateMachine(err,toState){
		console.log('state:',toState);

		if (err) {
			
			console.log('error:',err);
			res.send(util.wrapBody('Internal Error','E'));
		}else{
			switch(toState){
				case STATE_CHECK_PARAM:
					util.checkParam(req.body,['code'],function(err){
						stateMachine(err,STATE_LOGIN_EMAIL);
					});
				break;
				case STATE_LOGIN:
					login(req,res,'wechat');
				break;
				default:
					console.log('Invalid State');
					res.send(util.wrapBody('Internal Error','E'));
			}
		}
	}
}

function login(req,res,type){
	var type = null;
	var email = null;
	var password = null;
	var code = null;
	var loginResult = null;
	var latestUser = null;

	const STATE_LOGIN_WECHAT = 1;
	const STATE_LOGIN_EMAIL = 2;
	const STATE_IS_FRIST_TIME = 3;
	const STATE_GET_PROFILE = 4;
	const STATE_CREATE_USER = 5;
	const STATE_CREATE_TOKEN = 6;
	const STATE_SEND_RESPONSE = 0;

	if (tpye == 'email') {
		stateMachine(null,STATE_LOGIN_EMAIL);
	}else if (type == 'wechat') {
		stateMachine(null,STATE_LOGIN_WECHAT);
	}else{
		console.log('Invalide Type:');
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
						stateMachine(err,STATE_SEND_RESPONSE);
					});
				break;
				case STATE_LOGIN_EMAIL:
					email = req.body.email;
					password = req.body.password;

					uidHelper.loginByEmail(email,password,function(err,result){
						loginResult = result;
						stateMachine(err,STATE_SEND_RESPONSE);
					});
				break;
				case STATE_IS_FRIST_TIME:
					User.findById(loginResult.userId,function(err,userResult){
						latestUser = userResult;
						if(userResult == null){
							stateMachine(err,STATE_GET_PROFILE);
						}else{
							stateMachine(err,STATE_CREATE_TOKEN);
						}
					});
				break;
				case STATE_GET_PROFILE:

				break;
				case STATE_CREATE_USER:
				break;
				case STATE_CREATE_TOKEN:
				break;
				case STATE_SEND_RESPONSE:
					res.send(util.wrapBody({result:result}));
				break;
				default:
					console.log('Invalid State');
					res.send(util.wrapBody('Internal Error','E'));
			}
		}
	}
}
