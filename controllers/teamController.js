var teamRepository = require('../repositories/teamRepository');
var util = require('../util/util');

exports.list = function(req,res){
	var conditions = req.query;

	conditions.state = 1;

	teamRepository.query(conditions).then(function(result){
		res.send(util.wrapBody(result));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.checkExist = function(req,res){

	var name = req.query.name;

	checkNameExist(req.body.name).then(function(exist){
		res.send(util.wrapBody({exist:exist}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));		
	});
	
};

function checkNameExist(name){
	var q = teamRepository.countByName(name);

	return teamRepository.countByName(name).then(function(count){
		return count>0;
	});
}

exports.create = function(req,res){

	if(util.checkParam(req.body,['name'])){
		var lead = req.token.userId;

		var team = req.body;
		team.lead = lead;
		team.createDate = new Date();
		team.state = 1;

		teamRepository.create(team).then(function(result){
			res.send(util.wrapBody({team:result}));
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

exports.update = function(req,res){
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
			result.state = 0;
			return teamRepository.create(result);
		}).then(function updateCurrentTeam(){
			updates.createDate = new Date();
			return teamRepository.updateById(id,updates);
		}).then(function(team){
			res.send(util.wrapBody({team:team}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		});
	}else{
		teamRepository.updateById(id,updates).then(function(result){
			res.send(util.wrapBody({team:result}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		});
	}
};

function triggerNewTeam(conditions){
	var triggerCon = ['lead','member','coach','project'];

	for (var i = triggerCon.length - 1; i >= 0; i--) {
		if(triggerCon[i] in conditions){
			return true;
		}
	}

	return false;
}