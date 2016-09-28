var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = Schema({
	startDate:Date,

	endDate:Date,

	userStoris:[{
		type:Schema.Types.ObjectId,
		ref:'UserStory'
	}],

	task:[{
		type:Schema.Types.ObjectId,
		ref:'Task'
	}],

	deliverables:{
		//To Do
	}
});

var Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;