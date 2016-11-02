var User = require('../../models/user.js');

exports.findByUid = function(uid,callback) {
	User.findOne({uid:uid},callback);
}

exports.findById = function(id,callback){
	User.findById(id,callback);
}

exports.create = function(data,callback){
	User.create(data,callback);
}