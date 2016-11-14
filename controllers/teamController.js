var teamRepository = require('../repositories/teamRepository');
var util = require('../util/util');
var _ = require('lodash');

exports.list = function(req,res){
	var conditions = req.body;

	teamRepository.query(conditions).then(function(result){
		res.send(util.wrapBody(result));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.checkNameExist = function(req,res){
	var name = req.body.name;

	checkNameExist().then(function(exist){
		res.send(util.wrapBody({exist:exist}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));		
	});
};

function checkNameExist(name){
	teamRepository.countByName(name).then(function(count){
		return count>0;
	});
}

exports.create = function(req,res){

	if(util.checkParam(req.body,['name'])){
		var lead = req.token.userId;

		var team = req.body;
		team.lead = lead;
		team.createDate = new Date();
		team.state = 'active';

		teamRepository.create(team).then(function(result){
			res.send(util.wrapBody({team:team}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		});
	}else{
		res.send(util.wrapBody('Invalid Parameter','E'));
	}


};

exports.getTeamById = function(req,res) {
	var id = req.params.id;

	teamRepository.findById(id).then(function(result){
		res.send(util.wrapBody({team:result}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Err','E'));
	});
};

exports.updateTeam = function(req,res){
	var id = req.params.id;
	var lead = req.token.userId;
	var updates = req.body;
	if ('createDate' in updates) delete updates.createDate;
	if ('name' in updates && !updates.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}

	if (triggerNewTeam(updates)) {
		teamRepository.findById(id)
		.then(function copyToHistory(result){
			delete result._id;
			result.state = 'history';
			return teamRepository.create(result);
		}).then(function updateCurrentTeam(){
			updates.createDate = new Date();
			return teamRepository.updateById(id,updates);
		}).then(function(team){
			res.send(util.wrapBody({team:team}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		});
	}else{
		teamRepository.update(updates).then(function(result){
			res.send(util.wrapBody({team:result}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		});
	}
};

function triggerNewTeam(conditions){
	var triggerCon = ['lead','member','coach','project'];

	var intersection = _.intersection(triggerCon,conditions.keys);
	if (intersection.length>0) {
		return true;
	} else {
		return false;
	}
}