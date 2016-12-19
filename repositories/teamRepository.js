var Team = require('../models/team');
var uuid = require('node-uuid');
var repositoryUtil = require('./repositoryUtil');

exports.create = function(team){
	team.teamId = uuid.v1();
	return Team.create(team);
};

exports.findById = function(id){
	return Team.findById(id).populate('coach members').lean().exec();
};

exports.findActiveTeam = function(conditions){
	conditions.state = 1;

	return Team.findOne(conditions).populate('coach members').lean().exec();
};

exports.getTeamsById = function(teamId){
	return Team.find({
		teamId:teamId
	}).populate('coach members').lean().exec();
};

exports.removeById = function(id){
	return Team.findByIdAndRemove(id).exec();
};

exports.update = function(conditions,updates){
	return Team.findOneAndUpdate(conditions,updates,{
		new:true
	}).populate('coach members').exec();
};

exports.updateById = function(id,updates){
	return Team.findByIdAndUpdate(id,updates,{
		new:true
	}).populate('coach members').exec();
};

exports.countByName = function(name){
	return Team.count({name:name});
};

exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.name = new RegExp(options.keyword, "i");
	}

	if ('state' in options) {
		conditions.state = options.state;
	}

	return repositoryUtil.paging(Team,conditions,options,'coach members lead');

};
