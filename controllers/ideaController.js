var ideaRepostory= require('./repositories/ideaRepository');
var util = require('../util/util');

exports.createIdea = function(req,res){
	var idea = req.body.idea;

	ideaRepostory.create(idea,function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody({success:true}));
		}
	});
}

exports.deleteIdea = function(req,res){
	var ideaId = req.params.id;

	util.checkParams(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			ideaRepostory.deleteById(ideaId,function(err){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({success:true}));
				}
			})
		}
	})

}

exports.listIdea = function(req,res){
	util.checkParams(req.body,['pageSize','pageNum'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			var pageSize = req.body.pageSize;
			var pageNum = req.body.pageNum;

			var options = {
				pageNum:pageNum,
				pageSize:pageSize
			}

			ideaRepostory.queryIdea(options,function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody(result));
				}
			});
		}
	})

}


exports.updateIdea = function(req,res){
	var idea = req.body.idea;

	ideaRepostory.update(idea,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody({idea:result}));
		}
	});
}

exports.checkIfNameExists= function(req,res){


	util.checkParams(req.body,['name'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			var ideaName = req.body.name;

			ideaRepostory.count({name:ideaName},function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					var exist = result>0?true:false;
					res.send(util.wrapBody({exist:exist}));
				}
			});
		}
	});


}

exports.getIdeaById = function(req,res){
	
	util.checkParams(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			var ideaId = req.params.id;

			ideaRepostory.findById(ideaId,function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({idea:result}));
				}
			})
		}
	})


}