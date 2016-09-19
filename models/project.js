var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	name:String,

	description:String,

	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	backlog:[{
		as:String,

		do:String,

		soThat:String
	}],

	sprints:[{
		backlog:[]
	}]
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;