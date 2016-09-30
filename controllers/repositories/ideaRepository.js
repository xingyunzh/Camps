var Idea = require('../../models/idea');

exports.deleteById = function(id,callback){

	Idea
	.findByIdAndRemove(id)
	.exec(callback);
}

exports.count = function(conditions,callback){
	Idea
	.count(conditions,callback);
}

exports.findById = function(id,callback){
	Idea
	.findById(id)
	.exec(callback);
}

exports.update = function(data,callback){
	Idea
	.findByIdAndUpdate(data._id,data,{
		new:true
	},callback);
}

exports.create = function(data,callback){
	Idea
	.create(idea,callback);
}

/*
 #param options
	pageNum
	pageSize
	sector
	keywords
*/
exports.query = function(options,callback){
	var pageNum = options.pageNum;
	var pageSize = options.pageSize;
	var sector = options.sector;
	var sort = options.sort;

	//TO DO
	var keyword = options.keyword

	var query = Idea.where('name',new RegExp('^'+keyword+'$', "i")).sort('editDate');
	//end
	if (sector != undefined) {
		query = query.where('sector').eq(sector);
	};

	var totalCount = query.count();

	if (!!pageNum && !!pageSize) {
		var skipped = (pageNum - 1) * pageSize;
		query = query.skip(skipped).limit(pageSize);
	};

	query.exec(function(err,result){
		callback(err,{total:totalCount,list:result});
	});
}

