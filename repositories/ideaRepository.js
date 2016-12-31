var Idea = require('../models/idea');
var repositoryUtil = require('./repositoryUtil');

exports.deleteById = function(id){

	return Idea
	.findByIdAndRemove(id)
	.exec();
};

exports.count = function(conditions){
	return Idea.count(conditions).exec();
};

exports.findById = function(id){
	return Idea.findById(id).populate('innovator consultant').lean().exec();
};

exports.update = function(conditions,data){
	if ('name' in data) data.name = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});

	return Idea
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('innovator consultant')
	.exec();
};

exports.create = function(data){
	if ('name' in data) data.alphabetName = repositoryUtil.alphabetize(data.name,{
		separator:'|'
	});
	return Idea.create(data);
};


exports.query = function(options){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.alphabetName = repositoryUtil.buildSearchRegExp(options.keyword);
	}

	if ('sector' in options) {
		conditions.sector = options.sector;
	}

	if ('innovator' in options) {
		conditions.innovator = options.innovator;
	}

	return repositoryUtil.paging(Idea,conditions,options,'innovator consultant');

};

