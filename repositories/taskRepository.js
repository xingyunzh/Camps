var Task = require('../models/task');

exports.getTaskById = function(id) {
	return Task.findById(id).populate('assignee').lean().exec();
};

exports.create = function(task){
	return Task.create(task);
};

// exports.insertMany = function(tasks){
// 	return Task.insertMany(tasks);
// };

exports.updateById = function(id,data){
	return Task.findByIdAndUpdate(id,data,{
		new:true
	}).populate('assignee').lean().exec();
};

exports.deleteById = function(id) {
	return Task.findByIdAndRemove(id).exec();
};