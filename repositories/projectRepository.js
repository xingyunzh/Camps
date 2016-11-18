var Project = require('../models/project');
var UserStory = require('../models/userStory');

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
		path:'relatedIdea manager backlog',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.getBacklog = function(id){
	return Project.findById(id,'backlog').populate('backlog').lean().exec();
};

exports.getSprints = function(id){
	return Project.findById(id,'sprints').populate({
		path:'sprints',
		populate:{
			path:'backlog tasks'
		}
	}).sort('startDate').lean().exec();
};

exports.updateById = function(id,data){
	return Project
	.findByIdAndUpdate(id,data,{
		new:true
	})
	.populate({
		path:'relatedIdea manager backlog',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.update = function(conditions,data){

	return Project
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate({
		path:'relatedIdea manager backlog',
		populate:{
			path:'innovator consultant'
		}
	}).lean().exec();
};

exports.create = function(data){
	return Project.create(data);
};


exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.name = new RegExp(options.keyword, "i");
	}

	var totalCount = null;

	return Project
		.count(conditions)
		.then(function(result){
			totalCount = result;

			var pageNum = 0;
			var pageSize = 10;

			if ('pageNum' in options) {
				pageNum = options.pageNum;
			}

			if ('pageSize' in options) {
				pageSize = options.pageSize;
			}

			var skipped = pageNum * pageSize;

			if (pageSize >= totalCount) {
				skipped = 0;
			}else if (skipped >= totalCount) {
				skipped = total - pageSize;
			}

			return Project
				.find(conditions)
				.skip(skipped)
				.limit(pageSize)
				.populate('relatedIdea manager backlog')
				.exec();

		}).then(function(result){
			return {
				total:totalCount,
				projects:result
			};
		});

};

