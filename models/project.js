var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	name:String,

	scope:String,

	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	backlog:[{
		type:Schema.Type.ObjectId,
		ref:'UserStory'
	}],

	sprints:[{
		type:Schema.Type.ObjectId,
		ref:'Sprint'
	}]
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;