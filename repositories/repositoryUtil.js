var CamproError = require('../models/CamproError');

exports.paging = function(model,conditions,options,population) {
	var totalCount = null;

	return model.count(conditions).then(function(result){
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

		if (skipped >= totalCount) {
			throw new CamproError('Invalid Parameter: pageNum=' + pageNum);
		}

		return model
			.find(conditions)
			.skip(skipped)
			.limit(pageSize)
			.populate(population)
			.exec();

	}).then(function(result){
		return {
			total:totalCount,list:result
		};
	});
};