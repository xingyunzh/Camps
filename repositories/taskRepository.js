var Task = require('../models/task');

exports.getTaskById = function(id) {
	return Task.findById(id).lean().exec();
};

exports.create = function(task){
	return Task.create(task);
};

exports.insertMany = function(tasks){
	return Task.insertMany(tasks);
};

exports.updateById = function(id,data){
	return Task.findByIdAndUpdate(id,data).populate('assignee').lean().exec();
};

exports.deleteById = function(id) {
	return Task.findByIdAndRemove(id).exec();
};