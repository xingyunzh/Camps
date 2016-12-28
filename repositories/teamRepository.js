var Team = require('../models/team');
var repositoryUtil = require('./repositoryUtil');

exports.create = function(data){
	data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});
	return Team.create(data);
};

exports.findById = function(id){
	return Team.findById(id).populate('coach members project').lean().exec();
};

exports.findActiveTeam = function(conditions){
	conditions.state = 1;

	return Team.findOne(conditions).populate('coach members project').lean().exec();
};

exports.getTeamsById = function(teamId){
	return Team.find({
		teamId:teamId
	}).populate('coach members project').lean().exec();
};

exports.removeById = function(id){
	return Team.findByIdAndRemove(id).exec();
};

exports.update = function(conditions,updates){
	if('name' in updates) updates.alphabetName = repositoryUtil.alphabetize(updates.name,{
		separator:'|'
	});

	return Team.findOneAndUpdate(conditions,updates,{
		new:true
	}).populate('coach members project').lean().exec();
};

exports.updateById = function(id,updates){
	if('name' in updates) updates.alphabetName = repositoryUtil.alphabetize(updates.name,{
		separator:'|'
	});

	return Team.findByIdAndUpdate(id,updates,{
		new:true
	}).populate('coach members project').lean().exec();
};

exports.countByName = function(name){
	return Team.count({name:name});
};

exports.query = function(options){
	
	var conditions = {};

	if ('keyword' in options) {
		conditions.alphabetName = repositoryUtil.buildSearchRegExp(options.keyword);
	}

	if ('coach' in options) {
		conditions.coach = options.coach;
	}

	if ('state' in options) {
		conditions.state = options.state;
	}

	return repositoryUtil.paging(Team,conditions,options,'coach members project');

};
