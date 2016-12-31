var taskRepository = require('../repositories/taskRepository');
var userStoryRepository = require('../repositories/userStoryRepository');

var util = require('../util/util');

exports.create = function(req,res) {
	var userStoryId = req.params.id;

	var data = req.body;

	var newTask = null;

	taskRepository.create(data).then(function(task){
		newTask = task;

		return userStoryRepository.updateById(userStoryId,{
			$push:{
				tasks:task
			}
		});
	}).then(function(){
		res.send(util.wrapBody({task:newTask}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.remove = function(req,res){
	var id = req.params.id;

	taskRepository.deleteById(id).then(function(){
		res.send(util.wrapBody({success:true}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.update = function(req,res){
	var id = req.params.id;

	var changes = req.body;

	taskRepository.updateById(id,changes).then(function(task){
		res.send(util.wrapBody({task:task}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.getTasksByUserStory = function(req,res){
	var userStoryId = req.params.id;

	userStoryRepository.getTasks(userStoryId).then(function(tasks){
		res.send(util.wrapBody({tasks:tasks}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};