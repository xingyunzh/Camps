var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
	description:String,

	duedate:Date,

	effort:String,

	assignee:{
		type:Schema.Types.ObjectId,
		ref:'User'
	}
});

var Task = mongoose.model("Task", taskSchema);

module.exports = Task;