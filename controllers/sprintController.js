var sprintRepository = require('../repositories/sprintRepository');
var projectRepository = require('../repositories/projectRepository');
var taskRepository = require('../repositories/taskRepository');
var util = require('../util/util');
var _ = require('lodash');
var q = require('q');

exports.getSprintsByProject = function(req,res) {
	var projectId = req.params.id;

	projectRepository.getSprints(projectId).then(function(project){
		res.send(util.wrapBody({sprints:project.sprints}));
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
	var projectId = req.params.id;
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

		var newSprint = null;

		promise.then(function updateProject(sprint){
			var promises = [];

			promises.push(projectRepository.updateById(projectId,{
				$push:{
					sprints:sprint
				}
			}));

			promises.push(sprintRepository.findById(sprint._id));

			return q.all(promises);
		}).then(function sendResponse(results){
			res.send(util.wrapBody({sprint:results[1]}));
		}).fail(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		});

	}else{
		res.send(util.wrapBody('Invalid Parameter','E'));
	}

};

exports.remove = function(req,res){
	var id = req.params.id;

	sprintRepository.deleteById(id).then(function(){
		res.send(util.wrapBody({success:true}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.update = function(req,res){
	var sprintId = req.params.id;
	var updates = req.body;

	var promises = [];

	if ('tasks' in updates) {
		promises.push(updateTasks(updates.tasks));
	}

	// if ('discussMinutes' in sprint) {
	// 	promises.push(updateDiscusses(sprint.discussMinutes));
	// }

	q.all(promises).then(function integrateIds(tasks){
		var ids = getIds(tasks[0]);

		return sprintRepository.findById(sprintId).then(function(sprint){
			var oldIds = getIds(sprint.tasks);
			var uIds = _.union(oldIds,ids);
			// _.remove(uIds,function(n){
			// 	return n == null;
			// });
			return uIds;
		});

	}).then(function updateSprint(taskIds){
		updates.tasks = taskIds;
		return sprintRepository.updateById(sprintId,updates);
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
			return item._id.toString();
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
				promise = taskRepository.updateById(taskChange._id,taskChange);
			}else{
				//remove
				promise = taskRepository.deleteById(taskChange._id);
	
			}
		}else{
			//create
			promise = taskRepository.create(taskChange);
		}

		promises.push(promise);
	}

	return q.all(promises);
}

	

