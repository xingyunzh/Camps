var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
	description:String,

	duedate:Date,

	assignee:{
		type:Schema.Type.ObjectId,
		ref:'TeamMember'
	}
});

var Task = mongoose.model("Task", taskSchema);

module.exports = Task;