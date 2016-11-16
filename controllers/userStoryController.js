var userStoryRepository = require('../repositories/userStoryRepository');
var projectRepository = require('../repositories/projectRepository');
var util = require('../util/util');
var _ = require('lodash');

exports.getUSByProject = function(req,res){
	var id = req.params.id;

	projectRepository.getBacklog(id).then(function(backlog){
		res.send(util.wrapBody({backlog:backlog}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.createForProject = function(req,res){
	var projectId = req.params.id;

	var userStories = req.body.userStories;

	userStoryRepository.insertMany(userStories)
	.then(function updateProject(userStories){
		var ids = _.map(userStories,'_id');
		return projectRepository.updateById(projectId,{
			backlog:ids
		});
	}).then(function(backlog){
		res.send(util.wrapBody({backlog:backlog}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};


exports.updateForProject = function(req,res){
	var projectId = req.params.id;
	var usChanges = req.body.usChanges;

	updateUserStories(usChanges)
	.then(function integrateIds(userStories){
		var ids = _.map(userStories,'_id');

		return projectRepository.getProjectById(projectId)
		.then(function getBacklogs(project){
			return project.backlog;
		}).then(function unionIds(userStoryIds){
			return _.union(userStoryIds,ids);
		});

	}).then(function updateIds(ids){
		return projectRepository.updateById(projectId,{
			backlog:ids
		});
	}).then(function sendResponse(userStories){
		res.send(util.wrapBody({userStories:userStories}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};


function updateUserStories(usChanges,count){
	if (count === undefined) {
		count = usChanges.length;
	}else if(count === 0){
		return usChanges;
	}

	count--;
	var usChange = usChanges[count];
	var promise = null;
	if ('_id' in usChange) {
		promise = userStoryRepository.create(usChange);
	}else{
		var id = usChange._id;
		delete usChange._id;
		promise = userStoryRepository.updateById(id,usChange);
	}

	return promise.then(function(usChange){
		usChanges[count] = usChange;
		return updateUserStories(usChanges,count);
	});
}

exports.getUserStoryById = function(req,res) {
	var id = req.params.id;

	userStoryRepository.findById(id).then(function(userStory){
		res.send(util.wrapBody({userStory:userStory}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

};

