var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	name:String,

	headImgUrl:String,

	scope:String,

	createDate:Date,

	manager:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	relatedIdea:{
		type:Schema.Types.ObjectId,
		ref:'Idea'
	},

	relatedAssets:[{
		type:Schema.Types.ObjectId,
		ref:'Asset'
	}],

	backlog:[{
		type:Schema.Types.ObjectId,
		ref:'UserStory'
	}],

	sprints:[{
		type:Schema.Types.ObjectId,
		ref:'Sprint'
	}]
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;