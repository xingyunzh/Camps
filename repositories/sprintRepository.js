var Sprint = require('../models/sprint');
var Task = require('../models/task');

exports.create = function(data){
	return Sprint.create(data);
};

exports.findById = function(id) {
	return Sprint.findById(id).populate({
		path:'backlog',
		populate:{
			path:'tasks'
		}
	}).lean().exec();
};

exports.updateById = function(id,data){
	return Sprint.findByIdAndUpdate(id,data,{
		new:true
	}).populate({
		path:'backlog',
		populate:{
			path:'tasks'
		}
	}).lean().exec();
};

exports.deleteById = function(id) {
	return Sprint.findByIdAndRemove(id).exec();
};
