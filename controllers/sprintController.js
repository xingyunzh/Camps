var sprintRepository = require('../repositories/sprintRepository');
var projectRepository = require('../repositories/projectRepository');
var util = require('../util/util');
var _ = require('lodash');
var q = require('q');

exports.getSprintsByProject = function(req,res) {
	var projectId = req.params.id;

	projectRepository.getSprints(projectId).then(function(project){
		res.send(util.wrapBody({sprints:project.sprints}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.getSprintById = function(req,res){
	var sprintId = req.params.id;

	sprintRepository.findById(sprintId).then(function(sprint){
		res.send(util.wrapBody({sprint:sprint}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.create = function(req,res){
	var projectId = req.params.id;
	var sprint = req.body;

	if(util.checkParam(sprint,['startDate','endDate'])){

		var newSprint = null;

		sprintRepository
		.create(sprint)
		.then(function updateProject(sprint){
			newSprint = sprint;

			return projectRepository.updateById(projectId,{
				$push:{
					sprints:sprint
				}
			});

		}).then(function sendResponse(results){
			res.send(util.wrapBody({sprint:newSprint}));
		}).catch(function(err){
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
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.update = function(req,res){
	var sprintId = req.params.id;
	var updates = req.body;

	sprintRepository
	.updateById(sprintId,updates)
	.then(function(sprint){
		res.send(util.wrapBody({sprint:sprint}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

};

	

