var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
	description:String,

	duedate:Date,

	assignee:{
		type:Schema.Types.ObjectId,
		ref:'TeamMember'
	},

	userStory:{
		type:Schema.Types.ObjectId,
		ref:'UserStory'
	}
});

var Task = mongoose.model("Task", taskSchema);

module.exports = Task;