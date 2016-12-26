var Project = require('../models/project');
var UserStory = require('../models/userStory');
var repositoryUtil = require('./repositoryUtil');

exports.deleteById = function(id){

	return Project
	.findByIdAndRemove(id)
	.exec();
};

exports.count = function(conditions){
	return Project.count(conditions).exec();
};

exports.findById = function(id){
	return Project
	.findById(id)
	.populate({
		path:'relatedIdea manager',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.getBacklog = function(id){
	return Project.findById(id,'backlog').populate({
		path:'backlog',
		populate:{
			path:'tasks',
			populate:{
				path:'assignee'
			}
		}
	}).lean().exec();
};

exports.getSprints = function(id){
	return Project.findById(id,'sprints').populate('sprints').sort('startDate').lean().exec();
};

exports.updateById = function(id,data){
	if ('name' in data) data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});

	return Project
	.findByIdAndUpdate(id,data,{
		new:true
	})
	.populate({
		path:'relatedIdea manager',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.update = function(conditions,data){
	if ('name' in data) data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});

	return Project
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate({
		path:'relatedIdea manager',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.create = function(data){
	if ('name' in data) data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});

	return Project.create(data);
};


exports.query = function(options){
	
	var conditions = {};

	if ('keyword' in options) {
		conditions.alphabetName = repositoryUtil.buildSearchRegExp(options.keyword);
	}

    if ('idea' in options){
        conditions.relatedIdea = options.idea;
    }
    
	return repositoryUtil.paging(Project,conditions,options,{
		path:'relatedIdea manager',
		populate:{
			path:'innovator consultant'
		}
	});

};

