var Idea = require('../../models/idea');
var ObjectId = require('mongoose').Types.ObjectId;

exports.deleteById = function(id,callback){

	Idea
	.findByIdAndRemove(id)
	.exec(callback);
};

exports.count = function(conditions,callback){
	Idea
	.count(conditions,callback);
};

exports.findById = function(id,callback){
	Idea
	.findById(id)
	.lean()
	.exec(callback);
};

exports.update = function(conditions,data,callback){

	Idea
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('innovator')
	.exec(callback);
};

exports.create = function(data,callback){
	Idea
	.create(data,callback);
};

/*
 #param options
	pageNum
	pageSize
	sector
	keywords
*/
exports.query = function(options,callback){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.name = new RegExp(options.keyword, "i");
	}

	if ('sector' in options) {
		conditions.sector = options.sector;
	}

	if ('innovator' in options) {
		conditions.innovator = options.innovator;
	}

	var totalCount = null;

	console.log(options);
	console.log(conditions);

	Idea.count(conditions,function(err,result){
		if (err) {
			callback(err);
		}else{
			totalCount = result;

			var pageNum = 0;
			var pageSize = 10;

			if ('pageNum' in options && 'pageSize' in options) {
				pageNum = options.pageNum;
				pageSize = options.pageSize;
			}

			var skipped = (pageNum - 1) * pageSize;

			if (pageSize >= totalCount) {
				skipped = 0;
			}else if (skipped >= totalCount) {
				skipped = total - pageSize;
			}

			console.log('skip',skipped);
			console.log('total',totalCount);

			Idea
			.find(conditions)
			.skip(skipped)
			.limit(pageSize)
			.exec(function(err,result){
				callback(err,{total:totalCount,list:result});
			});
		}
	});

};

