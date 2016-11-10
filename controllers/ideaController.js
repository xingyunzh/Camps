var ideaRepostory= require('./repositories/ideaRepository');
var util = require('../util/util');

exports.createIdea = function(req,res){

	var userId = req.token.userId;

	var idea = req.body;

	if ('_id' in idea) delete idea._id;
	if ('state' in idea) delete idea.state;

	idea.innovator = userId;

	ideaRepostory.create(idea,function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody({success:true}));
		}
	});

};

exports.deleteIdea = function(req,res){
	

	util.checkParam(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var ideaId = req.params.id;

			ideaRepostory.deleteById(ideaId,function(err){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({success:true}));
				}
			});
		}
	});
};

exports.listIdea = function(req,res){
	var conditions = req.body;

	ideaRepostory.query(conditions,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		} else {
			res.send(util.wrapBody(result));
		}
	});

};

exports.publishIdea = function(req,res){
	var userId = req.token.userId;
	var ideaId = req.params.id;

	var data = req.body;
	var idea = null;
	var newIdea = null;
	var errMsg = null;

	const STATE_CREATE_IDEA = 1;
	const STATE_UPDATE_IDEA = 2;
 	const STATE_CHECK_REQUIRED_DATA = 3;
	const STATE_PUBLISH_IDEA = 4;
	const STATE_SEND_RESPONSE = 0;

	if (ideaId == 'new') {
		stateMachine(null,STATE_CREATE_IDEA);
	}else{
		stateMachine(null,STATE_UPDATE_IDEA);
	}

	function stateMachine(err,toState){
		console.log('state:',toState);

		if (err) {
			console.log('error:',err);
			errMsg = 'Internal Error';
			toState = STATE_SEND_RESPONSE;
		}

		switch(toState){
			case STATE_CREATE_IDEA:
				data.innovator = userId;
				ideaRepostory.create(data,function(err,result){
					idea = result;
					stateMachine(err,STATE_CHECK_REQUIRED_DATA);
				});
			break;
			case STATE_UPDATE_IDEA:
				ideaRepostory.update({
					_id:ideaId,
					innovator:userId
				},data,function(err,result){
					idea = result;
					stateMachine(err,STATE_CHECK_REQUIRED_DATA);
				});
			break;
			case STATE_CHECK_REQUIRED_DATA:

				if (!idea) {
					errMsg = 'Invalid innovator';
					stateMachine(null,STATE_SEND_RESPONSE);
				}else{
					console.log(idea);

					if(checkIdeaComplete(idea)){
						stateMachine(null,STATE_PUBLISH_IDEA);
					}else{
						errMsg = 'Miss data to publish';
						stateMachine(null,STATE_SEND_RESPONSE);
					}
				}

				
			break;
			case STATE_PUBLISH_IDEA:
				ideaRepostory.update({
					_id:idea._id
				},{
					state:'published'
				},function(err,result){
					newIdea = result;
					stateMachine(err,STATE_SEND_RESPONSE);
				});
			break;
			case STATE_SEND_RESPONSE:
				if (errMsg) {
					res.send(util.wrapBody(errMsg,'E'));
				}else{
					res.send(util.wrapBody({idea:newIdea}));
				}
			break;
			default:
				console.log('Invalid State');
				errMsg = 'Internal Error';
				stateMachine(null,STATE_SEND_RESPONSE);
		}
		
	}
};

function checkIdeaComplete(idea){
	var requires = ['name','background','solution','innovator',
					'sector','painPoint','hrRequirement'];

	for (var i = requires.length - 1; i >= 0; i--) {
		if(!idea[requires[i]]){
			console.log('Miss ' + requires[i]);
			return false;
		}
	}

	return true;
}

exports.updateIdea = function(req,res){

	var userId = req.token.userId;
	var ideaId = req.params.id;

	var idea = req.body;

	if ('_id' in idea) delete idea._id;
	if ('state' in idea) delete idea.state;

	ideaRepostory.update({
		_id:ideaId,
		innovator:userId
	},idea,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		} else {
			if (!result) {
				console.log('Invalid innovator',result);
				res.send(util.wrapBody('Invalid innovator','E'));
			}else{
				res.send(util.wrapBody({idea:result}));
			}
		}
	});
};

exports.checkIfNameExists= function(req,res){


	util.checkParam(req.body,['name'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var ideaName = req.body.name;

			ideaRepostory.count({name:ideaName},function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					var exist = result>0?true:false;
					res.send(util.wrapBody({exist:exist}));
				}
			});
		}
	});


};

exports.listIdeasByInnovator = function(req,res){

	var conditions = req.body;
	conditions.innovator = req.token.userId;

	ideaRepostory.query(conditions,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody(result));
		}
	});
}

exports.getIdeaById = function(req,res){
	
	util.checkParam(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var ideaId = req.params.id;

			ideaRepostory.findById(ideaId,function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({idea:result}));
				}
			});
		}
	})
}
