var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	name:String,

	scope:String,

	team:{
		type:Schema.Types.ObjectId,
		ref:'Team'
	},

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