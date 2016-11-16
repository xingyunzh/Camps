var UserStory = require('../models/userStory');

exports.create = function(data) {
	return UserStory.create(data);
};

exports.findById = function(id){
	return UserStory.findById(id).lean().exec();
};

exports.update = function(conditions,data){

	return UserStory
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.exec();
};

exports.updateById = function(id,data){

	return UserStory
	.findByIdAndUpdate(id,data,{
		new:true
	})
	.exec();
};

exports.create = function(data){
	return UserStory.create(data);
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

	if ('sector' in options) {
		conditions.sector = options.sector;
	}

	if ('innovator' in options) {
		conditions.innovator = options.innovator;
	}

	var totalCount = null;

	return Idea
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

			return Idea
				.find(conditions).populate("innovator consultant")
				.skip(skipped)
				.limit(pageSize)
				.exec();

		}).then(function(result){
			return {total:totalCount,ideas:result};
		});

};

