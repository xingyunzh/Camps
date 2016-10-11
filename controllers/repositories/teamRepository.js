var Team = require('../models/activeTeam');
var _ = require('ladash');

exports.create = function(team,callback){
	Team.create(team,callback);
}

exports.getTeamById = function(id,callback){
	Team.findById(id,callback);
}

exports.findActiveTeam = function(teamId,callback){
	Team
	.findOne({teamId:teamId})
	.lean()
	.exec(callback);
}

exports.removeById = function(id,callback){
	Team.findOneAndRemove({_id:id},callback);
}

exports.update = function(updates,callback){
	if(triggerNewTeam(updates)){
		//to do
	}else{
		//to do
	}
}

function triggerNewTeam(conditions){
	var triggerCon = [];

	var intersection = _.intersection(triggerCon,conditions.keys);
	if (intersection.length>0) {
		return true;
	} else {
		return false;
	}
}