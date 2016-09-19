var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamCoachSchema = Schema({
	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	coach:{
		type:Schema.Type.ObjectId,
		ref:'Coach'
	},

	startDate:Date
});

var TeamCoach = mongoose.model("TeamCoach", teamCoachSchema);

module.exports = TeamCoach;