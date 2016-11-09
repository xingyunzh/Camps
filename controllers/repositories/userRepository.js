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