var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = Schema({
	startDate:Date,

	endDate:Date,

	backlog:[{
		type:Schema.Type.ObjectId,
		ref:'UserStory'
	}],

	task:{
		type:Schema.Type.ObjectId,
		ref:'Tasks'
	},

	deliverables:{

	}
});

var Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;