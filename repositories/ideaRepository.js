var Idea = require('../models/idea');

exports.deleteById = function(id){

	return Idea
	.findByIdAndRemove(id)
	.exec();
};

exports.count = function(conditions){
	return Idea.count(conditions).exec();
};

exports.findById = function(id){
	return Idea.findById(id).lean().exec();
};

exports.update = function(conditions,data){

	return Idea
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('innovator')
	.exec();
};

exports.create = function(data){
	return Idea.create(data);
};


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

