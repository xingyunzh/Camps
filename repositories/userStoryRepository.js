var UserStory = require('../models/userStory');

exports.create = function(data) {
	return UserStory.create(data);
};

exports.remove = function(id){
	return UserStory.findByIdAndRemove(id).exec();
};

exports.findById = function(id){
	return UserStory.findById(id).lean().exec();
};

exports.insertMany = function(data){
	return UserStory.insertMany(data);
};

exports.update = function(conditions,data){

	return UserStory
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.exec();
};

exports.updateById = function(id,data){

	return UserStory
	.findByIdAndUpdate(id,data,{
		new:true
	})
	.exec();
};


