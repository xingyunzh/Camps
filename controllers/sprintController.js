var sprintRepository = require('../repositories/sprintRepository');
var projectRepository = require('../repositories/projectRepository');
var taskRepository = require('../repositories/taskRepository');
var util = require('../util/util');
var q = require('q');

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
	var sprint = req.body;

	var promises = [];

	if ('tasks' in sprint) {
		promises.push(updateTasks(sprint.tasks));
	}

	// if ('discussMinutes' in sprint) {
	// 	promises.push(updateDiscusses(sprint.discussMinutes));
	// }

	q.all(promises).then(function updateSprint(tasks){
		var ids = getIds(tasks);

		return sprintRepository.updateById(sprintId,{tasks:ids});
	}).then(function(sprint){
		res.send(util.wrapBody({sprint:sprint}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});


};


function getIds(data){
	return _.map(data,function(item){
		if (!!item) {
			return item._id.valueOf();
		}else{
			return item;
		}
	});
}

function updateTasks(taskChanges){
	var promises = [];

	for (var i = taskChanges.length - 1; i >= 0; i--) {
		var taskChange = taskChanges[i];
		var promise = null;

		if ('_id' in taskChange) {
			if ('description' in taskChange || 
				'duedate' in taskChange ||
				'effort' in taskChange ||
				'assignee' in taskChange ||
				'userStory' in taskChange) {
				
				//update
				promise = userStoryRepository.updateById(taskChange._id,taskChange);
			}else{
				//remove
				promise = userStoryRepository.remove(taskChange._id);
	
			}
		}else{
			//create
			promise = userStoryRepository.create(taskChange);
		}

		promises.push(promise);
	}

	return q.all(promises);
}

	

