var User = require('../models/user.js');

exports.findByUid = function(uid) {
	return User.findOne({uid:uid}).lean().exec();
};

exports.findById = function(id){
	return User.findById(id).lean().exec();
};

exports.create = function(data){
	return User.create(data);
};

exports.updateById = function(id,data){
	data.editDate = new Date();

	return User.findByIdAndUpdate(id,data,{
		new:true,
		upsert:false
	}).exec();
};

exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.nickname = new RegExp(options.keyword, "i");
	}

	if ('role' in options) {
		conditions.roles = options.role;
	}

	if ('sector' in options) {
		conditions.sector = options.sector;
	}

	var totalCount = null;

	return User.count(conditions).then(function(result){
		totalCount = result;

		var pageNum = 1;
		var pageSize = 10;

		if ('pageNum' in options && 'pageSize' in options) {
			pageNum = options.pageNum;
			pageSize = options.pageSize;
		}

		var skipped = (pageNum - 1) * pageSize;

		return User
		.find(conditions)
		.skip(skipped)
		.limit(pageSize)
		.exec();

	}).then(function(result){
		return {count:totalCount,list:result};
	});

};