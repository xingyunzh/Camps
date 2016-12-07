var User = require('../models/user.js');
var repositoryUtil = require('./repositoryUtil');

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

	return repositoryUtil.paging(User,conditions,options,'');

};