var Project = require('../models/project');
var Sprint = require('../models/Sprint');
var Task = require('../models/task');
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
		path:'relatedIdea',
		populate:{
			path:'innovator'
		}
	})
	.populate('sprints')
	.populate('backlog').lean().exec();
};

exports.update = function(conditions,data){

	return Project
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('relatedIdea')
	.populate('sprints')
	.populate('backlog')
	.exec();
};

exports.create = function(data){
	return Project.create(data);
};

/*
 #param options
	pageNum
	pageSize
	sector
	keywords
*/
exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.name = new RegExp(options.keyword, "i");
	}

	// if ('sector' in options) {
	// 	conditions.sector = options.sector;
	// }

	// if ('innovator' in options) {
	// 	conditions.innovator = options.innovator;
	// }

	var totalCount = null;

	return Project
		.count(conditions)
		.then(function(result){
			totalCount = result;

			var pageNum = 1;
			var pageSize = 10;

			if ('pageNum' in options) {
				pageNum = options.pageNum;
			}

			if ('pageSize' in options) {
				pageSize = options.pageSize;
			}

			var skipped = (pageNum - 1) * pageSize;

			if (pageSize >= totalCount) {
				skipped = 0;
			}else if (skipped >= totalCount) {
				skipped = total - pageSize;
			}

			return Project
				.find(conditions)
				.skip(skipped)
				.limit(pageSize)
				.populate('relatedIdea')
				.populate('sprints')
				.populate('backlog')
				.exec();

		}).then(function(result){
			return {
				total:totalCount,
				projects:result
			};
		});

};

