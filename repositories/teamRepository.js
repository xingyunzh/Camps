var Team = require('../models/team');
var uuid = require('node-uuid');
var repositoryUtil = require('./repositoryUtil');

exports.create = function(team){
	team.teamId = uuid.v1();
	return Team.create(team);
};

exports.findById = function(id){
	return Team.findById(id).populate('coach').populate('member').populate('lead').lean().exec();
};

exports.findByProject = function(id){
	return Team.findOne({
		project:id,
		state:1
	}).populate('coach member lead').lean().exec();
};

exports.getActiveTeam = function(teamId){
	return Team.findOne({
		teamId:teamId,
		state:1
	}).populate('coach').populate('member').populate('lead').lean().exec();
};

exports.getTeamsById = function(teamId){
	return Team.find({
		teamId:teamId
	}).populate('coach').populate('member').populate('lead').lean().exec();
};

exports.removeById = function(id){
	return Team.findByIdAndRemove(id).exec();
};

exports.update = function(conditions,updates){
	return Team.findOneAndUpdate(conditions,updates,{
		new:true
	}).populate('coach').populate('member').populate('lead').exec();
};

exports.updateById = function(id,updates){
	return Team.findByIdAndUpdate(id,updates,{
		new:true
	}).populate('coach').populate('member').populate('lead').exec();
};

exports.countByName = function(name){
	return Team.count({name:name});
};

exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.name = new RegExp(options.keyword, "i");
	}

	if ('member' in options) {
		conditions.member = options.member;
	}

	if ('lead' in options) {
		conditions.lead = options.lead;
	}

	if ('state' in options) {
		conditions.state = options.state;
	}

	return repositoryUtil.paging(Team,conditions,options,'coach member lead project');

};
