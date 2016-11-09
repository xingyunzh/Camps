var User = require('../../models/user.js');

exports.findByUid = function(uid,callback) {
	User.findOne({uid:uid}).lean().exec(callback);
}

exports.findById = function(id,callback){
	User.findById(id).lean().exec(callback);
}

exports.create = function(data,callback){
	User.create(data,callback);
}

exports.updateById = function(id,data,callback){
	data.editDate = new Date();

	User.findByIdAndUpdate(id,data,{
		new:true,
		upsert:false
	},callback);
}

exports.query = function(options,callback){
	

	var conditions = {};

	if ('keyword' in options) {
		conditions.nickname = new RegExp('^'+options.keyword+'$', "i");
	}

	if ('role' in options) {
		conditions.role = options.role;
	}

	if ('sector' in options) {
		conditions.sector = options.sector;
	}

	var totalCount = null;

	Idea.count(conditions,function(err,result){
		if (err) {
			callback(err);
		}else{
			totalCount = result;

			var pageNum = 0;
			var pageSize = 50;

			if ('pageNum' in options && 'pageSize' in options) {
				pageNum = options.pageNum;
				pageSize = options.pageSize;
			}

			var skipped = (pageNum - 1) * pageSize;

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