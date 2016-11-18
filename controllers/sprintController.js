var sprintRepository = require('../repositories/sprintRepository');
var projectRepository = require('../repositories/projectRepository');
var taskRepository = require('../repositories/taskRepository');
var util = require('../util/util');

exports.getSprintsByProject = function(req,res) {
	var projectId = req.params.id;

	projectRepository.getSprints(projectId).then(function(sprints){
		res.send(util.wrapBody({sprints:sprints}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.getSprintById = function(req,res){
	var sprintId = req.params.id;

	sprintRepository.findById(sprintId).then(function(sprint){
		res.send(util.wrapBody({sprint:sprint}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.create = function(req,res){
	var sprint = req.body;

	if(util.checkParam(sprint,['startDate','endDate'])){

		var promise = null;

		if ('tasks' in sprint) {
			promise = taskRepository.insertMany(sprint.tasks)
				.then(function(tasks){
					sprint.tasks = tasks;
					return sprintRepository.create(sprint);
				});
		}else{
			promise = sprintRepository.create(sprint);
		}

		promise.then(function(sprint){
			res.send(util.wrapBody({sprint:sprint}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		});

	}else{
		res.send(util.wrapBody('Invalid Parameter','E'));
	}

};

exports.update = function(req,res){
	var sprintId = req.params.id;

	var promise = null;
};

