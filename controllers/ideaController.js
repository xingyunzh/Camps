var ideaRepostory= require('../repositories/ideaRepository');
var util = require('../util/util');
var q = require('q');

exports.createIdea = function(req,res){

	var userId = req.token.userId;

	var idea = req.body;

	if ('_id' in idea) delete idea._id;
	if ('state' in idea) delete idea.state;

	idea.innovator = userId;

	if (!idea.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}

	ideaRepostory.create(idea).then(function(result){
		res.send(util.wrapBody({idea:idea}));
		
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));

	});
	

};

exports.deleteIdea = function(req,res){
	
	var ideaId = req.params.id;

	ideaRepostory.deleteById(ideaId).then(function(){
		res.send(util.wrapBody({success:true}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));

	});
};

exports.listIdea = function(req,res){
	var conditions = req.body;

	ideaRepostory.query(conditions).then(function(result){
		res.send(util.wrapBody(result));
		
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

};

exports.publishIdea = function(req,res){
	var userId = req.token.userId;
	var ideaId = req.params.id;

	var data = req.body;
	var idea = null;

	var promise = null;

	if(ideaId == 'new'){
		data.innovator = userId;
		promise = ideaRepostory.create(data);
	}else{
		promise = ideaRepostory.update({
			_id:ideaId,
			innovator:userId
		},data);
	}	

	promise.then(function checkRequiredData(idea){

		if (!idea) {
			throw new Error('Invalid innovator');
		}else{

			if(checkIdeaReady2Publish(idea)){
				return idea;
			}else{
				throw new Error('Miss data to publish');			
			}
		}
	}).then(function publishIdea(idea){

		return ideaRepostory.update({
			_id:idea._id
		},{
			state:'published'
		});

	}).then(function sendSuccessResponse(newIdea){
		res.send(util.wrapBody({idea:newIdea}));
	}).catch(function sendFailureResponse(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

};

function checkIdeaReady2Publish(idea){
	var requires = ['name','background','solution','innovator',
					'sector','painPoint'];

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

	if ('name' in idea && !idea.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}

	if ('_id' in idea) delete idea._id;
	if ('state' in idea) delete idea.state;

	ideaRepostory.update({
		_id:ideaId,
		innovator:userId
	},idea).then(function(result){
		if (!result) {
			console.log('Invalid innovator',result);
			res.send(util.wrapBody('Invalid innovator','E'));
		}else{
			res.send(util.wrapBody({idea:result}));
		}

	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
		
	});
};

exports.listIdeasByInnovator = function(req,res){
	var conditions = req.body;
	conditions.innovator = req.params.id;

	ideaRepostory.query(conditions).then(function(result){
		
		res.send(util.wrapBody(result));

	}).catch(function(err){
		if (typeof err == String) {
			res.send(util.wrapBody(err,'E'));
		} else {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}
	});

};

exports.getIdeaById = function(req,res){
	
	var ideaId = req.params.id;

	ideaRepostory.findById(ideaId).then(function(result){
		res.send(util.wrapBody({idea:result}));
		
	}).catch(function(err){
		if (typeof err == String) {
			res.send(util.wrapBody(err,'E'));
		} else {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}
	});
};
