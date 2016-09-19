var User = require('../models/user.js');
var http = require('http');
var uidHelper = require('../util/uidHelper');
var util = require('../util/util.js');
var queryString = require('querystring');


exports.loginByEmail = function(req,res){

	var email = null;
	var password = null;
	var loginResult = null;

	const STATE_CHECK_PARAM = 1;
	const STATE_LOGIN_EMAIL = 2;
	const STATE_SEND_RESPONSE = 0;

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
				case STATE_LOGIN_EMAIL:
					email = req.body.email;
					password = req.body.password;

					uidHelper.loginByEmail(email,password,function(err,result){
						loginResult = result;
						stateMachine(err,STATE_SEND_RESPONSE);
					});
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

exports.loginByWechat = function(req,res){
	var code = null;
	var loginResult = null;

	const STATE_CHECK_PARAM = 1;
	const STATE_LOGIN_WECHAT = 2;
	const STATE_SEND_RESPONSE = 0;

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
				case STATE_LOGIN_WECHAT:
					code = req.body.code;

					uidHelper.loginByWechat(code,function(err,result){
						loginResult = result;
						stateMachine(err,STATE_SEND_RESPONSE);
					});
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

exports.createUser = function(req,res){
	var email = req.body.email;
	var password = req.body.password;

}

exports.activateEmail = function(req,res){

}