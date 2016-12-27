var projectRepository = require('../repositories/projectRepository');
var teamRepository = require('../repositories/teamRepository');
var util = require('../util/util');
var q = require('q');

exports.list = function(req,res){
	var conditions = req.body;

	projectRepository.query(conditions)
	.then(function attachTeam(result){
		return populateTeams(result.list).then(function(projects){
			return {
				total:result.total,
				projects:projects
			};
		});
	}).then(function(fullProjects){
		res.send(util.wrapBody(fullProjects));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.create = function(req,res){

	if(util.checkParam(req.body,['name'])){
		var manager = req.token.userId;

		var project = req.body;
		project.manager = manager;
		project.createDate = new Date();

		projectRepository.create(project)
		.then(function findProject(result){
			return projectRepository.findById(result._id);
		}).then(function updateTeam(newProject){
			if (!!project.team) {
				return teamRepository.updateById(project.team,{
					project:newProject._id
				}).then(function(team){
					if ('project' in team) delete team.project;
					newProject.team = team;
					return newProject;
				});
			}else{
				return newProject;
			}

		}).then(function sendResponse(result){
			res.send(util.wrapBody({project:result}));
		}).catch(function(err){
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		});
	}else{
		res.send(util.wrapBody('Invalid Parameter','E'));
	}
};

exports.getProjectById = function(req,res) {
	var id = req.params.id;

	projectRepository.findById(id).then(populateTeam).then(function(result){
		res.send(util.wrapBody({project:result}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

function populateTeam(project){
	return teamRepository.findActiveTeam({
		project:project._id
	}).then(function(team){
		project.team = team;
		return project;
	});
}

function populateTeams(projects,count){
	var promises = [];

	for (var i = projects.length - 1; i >= 0; i--) {
		var project = projects[i];

		var promise = populateTeam(project);

		promises.push(promise);
	}

	return q.all(promises);
	
}

exports.update = function(req,res){
	var id = req.params.id;
	var updates = req.body;

	if ('createDate' in updates) delete updates.createDate;
	if ('name' in updates && !updates.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}

	projectRepository
	.updateById(id,updates)
	.then(function updateTeam(project){
		if (!!updates.team) {
			return teamRepository.updateById(updates.team,{
				project:project._id
			}).then(function(team){
				project.team = team;
				return project;
			});
		}else{
			return project;
		}
	}).then(function sendResponse(result){
		res.send(util.wrapBody({project:result}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Err','E'));
	});
};
