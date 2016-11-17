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
	}).then(function(project){
		res.send(util.wrapBody({backlog:project.backlog}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};


exports.updateForProject = function(req,res){
	var projectId = req.params.id;
	var usChanges = req.body.userStories;

	updateUserStories(usChanges)
	.then(function integrateIds(userStories){
		var ids = _.map(userStories,'_id');

		return projectRepository.findById(projectId)
		.then(function getBacklogs(project){
			return project.backlog;
		}).then(function unionIds(backlog){
			var userStoryIds = _.map(backlog,'_id');
			return unionObjectIds(userStoryIds,ids);
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

function unionObjectIds(a,b){

	for (var i = b.length - 1; i >= 0; i--) {
		if (!b[i]) {
			delete b[i];
			continue;
		}

		var flag = true;

		for (var j = a.length - 1; j >= 0; j--) {
			if (!a[j]) continue;
			if (b[i].toString() == a[j].toString()) {
				flag = false;
			}
		}

		if (flag) {
			a.push(b[i]);
		}


	}

	return a;
}

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
		if (!('as' in usChange) && !('want' in usChange) && !('soThat' in usChange)) {
			//remove
			promise = userStoryRepository.remove(usChange._id);
		}else{
			//update
			promise = userStoryRepository.updateById(usChange._id,usChange);	
		}
	}else{
		//create
		promise = userStoryRepository.create(usChange);
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

