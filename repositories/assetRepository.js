var Asset = require('../models/asset');
var uuid = require('node-uuid');
var repositoryUtil = require('./repositoryUtil');

exports.create = function(data){
	data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});
	return Asset.create(data);
};

exports.findById = function(id){
	return Asset.findById(id).populate('maintainer').lean().exec();
};

exports.updateById = function(id,updates){
	if('name' in updates) updates.alphabetName = repositoryUtil.alphabetize(updates.name,{
		separator:'|'
	});

	return Asset.findByIdAndUpdate(id,updates,{
		new:true
	}).populate('maintainer').lean().exec();
};

exports.countByName = function(name){
	return Asset.count({name:name});
};

exports.query = function(options){
	
	var conditions = {};

	if ('keyword' in options) {
		conditions.alphabetName = repositoryUtil.buildSearchRegExp(options.keyword);
	}

	if ('maintainer' in options) {
		conditions.maintainer = options.maintainer;
	}

	if ('category' in options) {
		conditions.category = options.category;
	}

	return repositoryUtil.paging(Asset,conditions,options,'maintainer');

};