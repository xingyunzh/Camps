var UserStory = require('../models/userStory');

exports.create = function(data) {
	return UserStory.create(data);
};

exports.remove = function(id){
	return UserStory.findByIdAndRemove(id).exec();
};

exports.getTasks = function(id){
	return UserStory.findById(id,'tasks').populate({
		path:'tasks',
		populate:{
			path:'assignee'
		}
	}).lean().exec();
};

exports.findById = function(id){
	return UserStory.findById(id).lean().exec();
};

// exports.insertMany = function(data){
// 	return UserStory.insertMany(data);
// };

exports.update = function(conditions,data){

	return UserStory
	.findOneAndUpdate(conditions,data,{
		new:true
	})
	.populate('tasks')
	.exec();
};

exports.updateById = function(id,data){

	return UserStory
	.findByIdAndUpdate(id,data,{
		new:true
	})
	.populate('tasks')
	.exec();
};


