var Sprint = require('../models/sprint');

exports.getSprintById = function(id) {
	return Sprint.findById(id).lean().exec();
};

exports.updateById = function(id,data){
	return Sprint.findByIdAndUpdate(id,data).populate({
		path:'tasks backlog',
		populate:{
			path:'assignee'
		}
	}).lean().exec();
};

exports.deleteById = function(id) {
	return Sprint.findByIdAndRemove(id).exec();
};
