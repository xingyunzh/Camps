var projectRepository = require('../repositories/projectRepository');
var teamRepository = require('../repositories/teamRepository');
var util = require('../util/util');

exports.list = function(req,res){
	var conditions = req.body;

	projectRepository.query(conditions)
	.then(function attachTeam(result){
		return populateTeams(result.projects).then(function(projects){
			result.projects = projects;
			return result;
		});
	}).then(function(fullProject){
		res.send(util.wrapBody(fullProject));
	}).fail(function(err){
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
		.then(function updateTeam(newProject){
			var promise = null;

			if (!!project.team) {
				promise = teamRepository.updateById(project.team,{
					project:newProject._id
				}).then(function(team){
					newProject.team = team;
					return newProject;
				});
			}else{
				promise =  newProject;
			}

			return promise;
		}).then(function sendResponse(result){
			res.send(util.wrapBody({project:result}));
		}).fail(function(err){
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
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

var populateTeam = function(project){
	return teamRepository.findByProject(project._id).then(function(team){
		project._doc.team = team;
		return project;
	});
};

function populateTeams(projects,count){
	if (count === undefined) {
		count = projects.length;
	}else if(count === 0){
		return projects;
	}

	count--;

	return populateTeam(projects[count]).then(function(project){
		projects[count] = project;
		return populateTeams(projects,count);
	});
	
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
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Err','E'));
	});
};
