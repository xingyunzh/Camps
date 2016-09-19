var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
	description:String,

	duration:Number,

	assignee:{
		type:Schema.Type.ObjectId,
		ref:'TeamMember'
	}
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;