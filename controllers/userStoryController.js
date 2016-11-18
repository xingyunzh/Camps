var userStoryRepository = require('../repositories/userStoryRepository');
var projectRepository = require('../repositories/projectRepository');
var util = require('../util/util');
var _ = require('lodash');
var q = require('q');

exports.getUSByProject = function(req,res){
	var id = req.params.id;

	projectRepository.getBacklog(id).then(function(project){
		res.send(util.wrapBody({backlog:project.backlog}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

// exports.createForProject = function(req,res){
// 	var projectId = req.params.id;

// 	var userStories = req.body.userStories;

// 	userStoryRepository.insertMany(userStories)
// 	.then(function updateProject(userStories){
// 		var ids = _.map(userStories,'_id');
// 		return projectRepository.updateById(projectId,{
// 			backlog:ids
// 		});
// 	}).then(function(project){
// 		res.send(util.wrapBody({backlog:project.backlog}));
// 	}).fail(function(err){
// 		console.log(err);
// 		res.send(util.wrapBody('Internal Error','E'));
// 	});
// };


exports.updateForProject = function(req,res){
	var projectId = req.params.id;
	var usChanges = req.body.userStories;

	updateUserStories(usChanges)
	.then(function integrateIds(userStories){

		var ids = getIds(userStories);

		return projectRepository.findById(projectId)
		.then(function getBacklogs(project){
			return project.backlog;
		}).then(function unionIds(backlog){
			var userStoryIds = getIds(backlog);

			return _.union(userStoryIds,ids);
		});

	}).then(function updateIds(ids){
		return projectRepository.updateById(projectId,{
			backlog:ids
		});
	}).then(function sendResponse(project){
		res.send(util.wrapBody({backlog:project.backlog}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

function getIds(userStories){
	return _.map(userStories,function(item){
		if (!!item) {
			return item._id.valueOf();
		}else{
			return item;
		}
	});
}

function updateUserStories(usChanges){
	var promises = [];

	for (var i = usChanges.length - 1; i >= 0; i--) {
		var usChange = usChanges[i];
		var promise = null;

		if ('_id' in usChange) {
			if ('as' in usChange ||
				'want' in usChange ||
				'soThat' in usChange) {
				
				//update
				promise = userStoryRepository.updateById(usChange._id,usChange);	
				
			}else{
				//remove
				promise = userStoryRepository.remove(usChange._id);

			}
		}else{
			//create
			promise = userStoryRepository.create(usChange);
		}

		promises.push(promise);
	}

	return q.all(promises);
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

