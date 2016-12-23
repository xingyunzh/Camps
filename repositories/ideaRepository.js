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

	return Idea
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('innovator consultant')
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

	return repositoryUtil.paging(Idea,conditions,options,'innovator consultant');

};

