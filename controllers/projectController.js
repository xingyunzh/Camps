var projectRepository = require('../repositories/projectRepository');
var util = require('../util/util');

exports.list = function(req,res){
	var conditions = req.body;

	conditions.state = 'active';

	projectRepository.query(conditions).then(function(result){
		res.send(util.wrapBody(result));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
};

exports.create = function(req,res){

	if(util.checkParam(req.body,['name'])){
		var lead = req.token.userId;

		var project = req.body;

		projectRepository.create(project).then(function(result){
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

	projectRepository.findById(id).then(function(result){
		res.send(util.wrapBody({project:result}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Err','E'));
	});
};

exports.update = function(req,res){
	var id = req.params.id;
	var updates = req.body;

	projectRepository.updateById(id,updates).then(function(result){
		res.send(util.wrapBody({project:result}));
	}).fail(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Err','E'));
	});
};
