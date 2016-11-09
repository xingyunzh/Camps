var ideaRepostory= require('./repositories/ideaRepository');
var util = require('../util/util');

exports.createIdea = function(req,res){

	var requires = [];

	var idea = {
		state:'unPublished'
	};

	if (!!req.body.state && req.body.state == 'published') {
		idea.state = 'published';
		requires = ['name','background','deadline','painPoint',
					'sector','solution','hrRequirement'];
	}

	util.checkParam(req.body,requires,function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var userId = req.token.userId;

			idea = {
				name:req.body.name,
				background:req.body.background,
				innovator:userId,
				deadline:req.body.deadline,
				painPoint:req.body.painPoint,
				sector:req.body.sector,
				solution:req.body.solution,
				hrRequirement:req.body.hrRequirement
			};

			if (!req.body.relatedAssets) {
				idea.relatedAssets = [];
			}else{
				idea.relatedAssets = req.body.relatedAssets;
			}

			ideaRepostory.create(idea,function(err){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({success:true}));
				}
			});
		}
	});

};

exports.deleteIdea = function(req,res){
	

	util.checkParam(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var ideaId = req.params.id;

			ideaRepostory.deleteById(ideaId,function(err){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Err','E'));
				} else {
					res.send(util.wrapBody({success:true}));
				}
			});
		}
	});
};

exports.listIdea = function(req,res){
	var options = {
		pageNum:req.body.pageNum,
		pageSize:req.body.pageSize
	};

	ideaRepostory.query(options,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		} else {
			res.send(util.wrapBody(result));
		}
	});

	// util.checkParam(req.body,['pageSize','pageNum'],function(err){
	// 	if (err) {
	// 		console.log(err);
	// 		res.send(util.wrapBody('Invalid Parameter','E'));
	// 	} else {

	// 		var options = {
	// 			pageNum:req.body.pageNum,
	// 			pageSize:req.body.pageSize
	// 		};

	// 		ideaRepostory.query(options,function(err,result){
	// 			if (err) {
	// 				console.log(err);
	// 				res.send(util.wrapBody('Internal Error','E'));
	// 			} else {
	// 				res.send(util.wrapBody(result));
	// 			}
	// 		});
	// 	}
	// });

};


exports.updateIdea = function(req,res){
	var requires = ['id'];

	var idea = {
		state:'unPublished'
	};

	if (!!req.body.state && req.body.state == 'published') {
		idea.state = 'published';
		requires = ['id','name','background','deadline','painPoint',
					'sector','solution','hrRequirement'];
	}

	util.checkParam(req.body,requires,function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
		} else {
			var userId = req.token.userId;
			var ideaId = req.body.id;

			idea = {
				name:req.body.name,
				background:req.body.background,
				deadline:req.body.deadline,
				painPoint:req.body.painPoint,
				sector:req.body.sector,
				solution:req.body.solution,
				hrRequirement:req.body.hrRequirement,
				consultant:req.body.consultant
			};

			if (!req.body.relatedAssets) {
				idea.relatedAssets = [];
			}else{
				idea.relatedAssets = req.body.relatedAssets;
			}

			ideaRepostory.update(ideaId,userId,idea,function(err,result){
				if (err) {
					console.log(err);
					res.send(util.wrapBody('Internal Error','E'));
				} else {
					if (!result) {
						console.log('Invalid innovator');
						res.send(util.wrapBody('Invalid innovator','E'));
					}else{
						res.send(util.wrapBody({idea:result}));
					}
				}
			});
		}
	});
}

exports.checkIfNameExists= function(req,res){


	util.checkParam(req.body,['name'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
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
	
	util.checkParam(req.params,['id'],function(err){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Invalid Parameter','E'));
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